import { browser } from 'protractor';
import * as protractorUtils from '@angular/bazel/protractor-utils';

export = function(config) {
  const portFlag = config.server.endsWith('prodserver') ? '-p' : '-port';
  return protractorUtils
    .runServer(config.workspace, config.server, portFlag, [])
    .then(serverSpec => {
      const serverUrl = `http://localhost:${serverSpec.port}`;
      console.log(`Server has been started, starting tests against ${serverUrl}`);
      browser.baseUrl = serverUrl;
    });
}
