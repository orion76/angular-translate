import { Entity } from '@app-library/ng-http-service/entity/entity.class';
import { IUser, EUserRole } from './types';

export class User extends Entity implements IUser {
  get role() {
    return this.field('role').getValue<EUserRole>();
  }
}