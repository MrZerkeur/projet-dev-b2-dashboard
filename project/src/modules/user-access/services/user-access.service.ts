import { BadRequestException, Injectable } from '@nestjs/common';
import { isEqual } from 'lodash';
import { Site } from 'src/modules/sites/entity/site.entity';
import { User } from 'src/modules/users/entity/user.entity';

@Injectable()
export class UserAccessService {
  grantUserAccess(user, site: Site) {
    const loggedUser = new User();
    loggedUser.id = user.id;
    loggedUser.firstName = user.firstName;
    loggedUser.lastName = user.lastName;
    loggedUser.email = user.email;
    for (const user of site.users) {
      if (isEqual(user, loggedUser)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { users, ...returnSite } = site;
        return { site: returnSite };
      }
    }
    throw new BadRequestException('Ressource not found');
  }
}
