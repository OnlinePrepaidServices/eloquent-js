import {User} from "../__tests_data__/Support/UserEntity";
import {Configuration} from "../Configuration";
import {config} from "../__tests_data__/config"
import axios from "axios";
import {Collection} from "collect.js";
import {GetRouteBuilder} from "../Builder/GetRouteBuilder";
import {MultipleRouteParametersEntity} from "../__tests_data__/Support/MultipleRouteParametersEntity";


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

Configuration.load(config);

const staticUsers: Collection<any> = new Collection([
    {
        uuid: '779bd1c2-324e-4b2c-b161-4e0c6a0ff38c',
        first_name: 'Jan',
        last_name: 'Jansen',
        email: 'jan@jansen.com',
        created_at: '2021-07-04T21:33:01+02:00',
    },
    {
        uuid: '300db42f-49f6-4331-9d97-127900f645ef',
        first_name: 'Piet',
        last_name: 'Pietersen',
        email: 'piet@pietersen.com',
        created_at: '2022-08-04T21:33:01+02:00',
    }]
);


describe('Entity', () => {
    describe('An entity can interact with the server.', () => {
        it('can extend two classes', () => {
            let subParameterBuilder = GetRouteBuilder;
            let queryBuilder = new subParameterBuilder();
            queryBuilder.include('unit').include('unit2');
            queryBuilder.filter('unit', 'unit1').filter('bunit', 'bunit1');
            queryBuilder.routeParameter('lala', 'asdf');
        });

        it('can handle single relations', () => {
            const user = {...staticUsers.get(0)};
            user.created_by = {...staticUsers.get(1)};

            const userObject = new User(user);
            expect(userObject.createdBy).toBeInstanceOf(User);
        })

        it('can handle multiple relations', () => {
            const user = {...staticUsers.get(0)};
            user.created_by = [{...staticUsers.get(0)}, {...staticUsers.get(1)}];

            const userObject = new User(user);
            expect(userObject.createdBy).toBeInstanceOf(Array);
            userObject.createdBy.forEach((value: User) => {
                expect(value).toBeInstanceOf(User);
            });
        })

        it('can handle multiple route parameters', () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: [
                        staticUsers.get(0),
                        staticUsers.get(1)
                    ]
                }
            });

            const users = MultipleRouteParametersEntity.$get(function (routeBuilder) {
                expect(routeBuilder).toBeInstanceOf(GetRouteBuilder);
                routeBuilder.routeParameter('unit', 'abc');
            });

            expect(axios.get).toHaveBeenCalledWith(`/api/users/abc`);
        });

        it('can get multiple users', () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: [
                        staticUsers.get(0),
                        staticUsers.get(1)
                    ]
                }
            });

            const users: Promise<Collection<User>> = User.$get();
            expect(axios.get).toHaveBeenCalledWith(`/api/users`);
            expect(users).resolves.toBeInstanceOf(Collection);
            users.then((userCollection) => {
                userCollection.each((user, key) => {
                    expect(user.toObject(true)).toEqual(staticUsers.get(parseInt(key as string)));
                })
            });
        });

        it('can find a user', () => {
            const user1: any = staticUsers.first()
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: user1
                }
            });
            const user: Promise<User> = User.$find(user1.uuid);
            expect(axios.get).toHaveBeenCalledWith(`/api/users/${user1.uuid}`);
            expect(user).resolves.toBeInstanceOf(User);
            user.then((user) => {
                console.log(user.createdAt);
                expect(user.toObject(true)).toEqual(user1);
            })
        });
    });
})
