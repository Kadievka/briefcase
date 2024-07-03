import IUser from '../../interfaces/IUser';
import IPaginationOutput from '../../interfaces/configurations/IPaginationOutput';

/* tslint:disable */
const usersJson = require('../db/Briefcase.users.json') as IUser[];

const user1 = usersJson[0];
const user2 = usersJson[1];
const user3 = usersJson[2];
const user4 = usersJson[3];
const user5 = usersJson[4];

const users = [user1, user2, user3, user4, user5];

const usersPagination: IPaginationOutput = {
    docs: users,
    page: 1,
    pages: 3,
    limit: 5,
    skip: 0,
    total: 12,
};

export { usersJson, user1, user2, user3, user4, user5, users, usersPagination };
