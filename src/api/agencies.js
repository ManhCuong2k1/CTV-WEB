import axios from '~/libs/axios';

export const getAll = () => [{
    id: 1,
    name: 'Gia dụng A',
    slug: 'ABC123',
    avatar: 'https://cf.shopee.vn/file/719f1f779b3cc5dd69804799a034da79_tn',
    location: 'Đông Anh - Hà Nội',
    products_count: 1234,
    categories_count: '4',
    created_at: '2021-08-04T14:02:18.000Z',
    products: [{
        image: 'https://cdn.cotavi.vn/statics/gallery/202108/mb42b03c3-8419-416f-8a4e-588034318354250x250.Png',
    }, {
        image: 'https://cdn.cotavi.vn/statics/gallery/202108/m070999d3-a731-438b-afe9-5a6a0a83cb0d250x250.Png',
    }, {
        image: 'https://cdn.cotavi.vn/statics/gallery/202107/m8f3b8ea2-3f44-4d39-9382-81f11814f736250x250.Jpeg',
    }, {
        image: 'https://cdn.cotavi.vn/statics/gallery/202107/m294e69e3-41b5-4aa5-9e36-05da22609db3250x250.Jpeg',
    }],
}];

export const getAgency = (agencyId) => axios.get(`/app/distributor/${agencyId}`).then((_) => _.data);
