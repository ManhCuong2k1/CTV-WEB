import axios from '~/libs/axios';

export const getCurrentUser = () => axios.get('/app/users/me').then((_) => _.data);

export const getAll = () => [{
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}, {
    avatar: '',
    name: 'Duis ipsum minim',
    city: 'Hà Nội',
}];
