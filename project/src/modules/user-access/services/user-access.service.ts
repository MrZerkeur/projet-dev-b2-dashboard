/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { isEqual } from 'lodash';
import { Site } from 'src/modules/sites/entity/site.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class UserAccessService {
  constructor(private usersService: UsersService) {}
  grantUserAccess(user, site: Site) {
    if (!site) {
      throw new BadRequestException('Site not found');
    }
    if (user.isAdmin) {
      const { users, ...returnSite } = site;
      return { site: returnSite, loggedInUser: user };
    }
    const loggedUser = new User();
    loggedUser.id = user.id;
    loggedUser.firstName = user.firstName;
    loggedUser.lastName = user.lastName;
    loggedUser.email = user.email;
    for (const user of site.users) {
      if (isEqual(user, loggedUser)) {
        const { users, ...returnSite } = site;
        return { site: returnSite, loggedInUser: user };
      }
    }
    throw new BadRequestException('Site not found or cannot be accessed');
  }
}
