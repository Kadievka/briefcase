import User from '../../interfaces/User';

const testPass = '123456789';

const user1: User = {
    name: 'Ana',
    surname: 'Lopez',
    email: 'ana@mail.com',
    password: testPass,
};

const user2: User = {
    name: 'Maria',
    surname: 'Martinez',
    email: 'maria@mail.com',
    password: testPass,
};

const user3: User = {
    name: 'Juan',
    surname: 'Perez',
    email: 'juan@mail.com',
    password: testPass,
};

const user4: User = {
    name: 'Pedro',
    surname: 'Gutierrez',
    email: 'pedro@mail.com',
    password: testPass,
};

export { user1, user2, user3, user4 };
