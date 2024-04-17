import IUser from '../../interfaces/IUser';

const testPass = '123456789';

const user1: IUser = {
    email: 'ana@mail.com',
    name: 'Ana',
    password: testPass,
    surname: 'Lopez',
};

const user2: IUser = {
    email: 'maria@mail.com',
    name: 'Maria',
    password: testPass,
    surname: 'Martinez',
};

const user3: IUser = {
    email: 'juan@mail.com',
    name: 'Juan',
    password: testPass,
    surname: 'Perez',
};

const user4: IUser = {
    email: 'pedro@mail.com',
    name: 'Pedro',
    password: testPass,
    surname: 'Gutierrez',
};

export { user1, user2, user3, user4 };
