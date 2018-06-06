/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as protractorUtils from '@angular/bazel/protractor-utils';
import {browser} from 'protractor';

export = function(config) {
  if (!(global as any).userOnPrepareGotCalled) {
    throw new Error('Expecting user configuration onPrepare to have been called');
  }
  const portFlag = config.server.endsWith('prodserver') ? '-p' : '-port';
  return protractorUtils.runServer(config.workspace, config.server, portFlag, [])
      .then(serverSpec => {
        const serverUrl = `http://localhost:${serverSpec.port}`;
        browser.baseUrl = serverUrl;
      });
};
