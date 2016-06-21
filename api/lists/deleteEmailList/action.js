'use strict';

import { List } from 'moonmail-models';
import { debug } from '../../lib/logger';
import decrypt from '../../lib/auth-token-decryptor';
import { ApiErrors } from '../../lib/errors';

export function respond(event, cb) {
  debug('= deleteEmailList.action', JSON.stringify(event));
  decrypt(event.authToken).then((decoded) => {
    if (event.listId) {
      List.delete(decoded.sub, event.listId).then(result => {
        debug('= deleteEmailList.action', 'Success');
        return cb(null, result);
      })
      .catch(e => {
        debug('= deleteEmailList.action', e);
        return cb(ApiErrors.response(e));
      });
    } else {
      return cb(ApiErrors.response('No list specified'));
    }
  })
  .catch(err => cb(ApiErrors.response(err), null));
}
