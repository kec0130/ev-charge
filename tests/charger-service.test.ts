import assert from 'node:assert/strict';
import { test } from 'node:test';
import axios, { AxiosAdapter } from 'axios';

test('provider client validates and paginates API results', async (t) => {
  const originalAdapter = axios.defaults.adapter;
  const originalKey = process.env.EV_CHARGER_SERVICE_KEY;
  let respond: AxiosAdapter = async () => { throw new Error('No fixture'); };
  axios.defaults.adapter = (config) => respond(config);
  process.env.EV_CHARGER_SERVICE_KEY = 'test-only';
  const { getChargersAPI } = await import('../src/services/charger');
  t.after(() => {
    axios.defaults.adapter = originalAdapter;
    if (originalKey === undefined) delete process.env.EV_CHARGER_SERVICE_KEY;
    else process.env.EV_CHARGER_SERVICE_KEY = originalKey;
  });

  await t.test('fetches subsequent pages and accepts a single-item response', async () => {
    const calls: number[] = [];
    respond = async (config) => {
      const pageNo = config.params.pageNo;
      calls.push(pageNo);
      assert.equal(config.baseURL, 'https://apis.data.go.kr/B552584/EvCharger');
      assert.equal(config.timeout, 15000);
      return { config, status: 200, statusText: 'OK', headers: {}, data: {
        resultCode: '00', totalCount: 2, items: { item: { statId: String(pageNo) } },
      } };
    };
    assert.equal((await getChargersAPI('11140')).length, 2);
    assert.deepEqual(calls, [1, 2]);
  });

  await t.test('accepts a successful empty region', async () => {
    respond = async (config) => ({ config, status: 200, statusText: 'OK', headers: {},
      data: { resultCode: '00', totalCount: 0, items: null } });
    assert.deepEqual(await getChargersAPI('11140'), []);
  });

  await t.test('rejects quota errors returned with HTTP 200', async () => {
    respond = async (config) => ({ config, status: 200, statusText: 'OK', headers: {},
      data: { resultCode: '22', resultMsg: 'quota' } });
    await assert.rejects(getChargersAPI('11140'), /unsuccessful/);
  });

  await t.test('rejects missing pages instead of returning misleading partial data', async () => {
    respond = async (config) => ({ config, status: 200, statusText: 'OK', headers: {},
      data: { resultCode: '00', totalCount: 10, items: { item: [] } } });
    await assert.rejects(getChargersAPI('11140'), /incomplete/);
  });

  await t.test('propagates network failures for the API route to handle', async () => {
    respond = async () => { throw new Error('Network offline'); };
    await assert.rejects(getChargersAPI('11140'), /Network offline/);
  });
});
