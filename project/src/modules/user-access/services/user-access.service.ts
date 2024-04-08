import { BadRequestException, Injectable } from '@nestjs/common';
import { isEqual } from 'lodash';
import { Site } from 'src/modules/sites/entity/site.entity';
import { User } from 'src/modules/users/entity/user.entity';

@Injectable()
export class UserAccessService {
  grantUserAccess(user, site: Site) {
    if (!site) {
      throw new BadRequestException('Site not found');
    }
    const loggedUser = new User();
    loggedUser.id = user.id;
    loggedUser.firstName = user.firstName;
    loggedUser.lastName = user.lastName;
    loggedUser.email = user.email;
    console.log(site.users);
    for (const user of site.users) {
      if (isEqual(user, loggedUser)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { users, ...returnSite } = site;
        return { site: returnSite };
      }
    }
    throw new BadRequestException('Site not found or cannot be accessed');
  }
}
