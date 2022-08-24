import {User} from "../__tests_data__/Support/UserEntity";
import {Configuration} from "../Configuration";
import axios from "axios";
import {Collection} from "collect.js";
import {GetRouteBuilder} from "../Builder/GetRouteBuilder";
import {MultipleRouteParametersEntity} from "../__tests_data__/Support/MultipleRouteParametersEntity";
import {config} from "../config";
import {PaginationCollection} from "../Collection/PaginationCollection";
import moment from "moment";

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
        // @todo check why the order of test matter in this one.
        it('does not perform an axios call when partially updating the entity asserting the entity is clean', () => {
            const user = new User({...staticUsers.first()});
            user.$patch().then((newUser) => {
                expect(user).toEqual(newUser);
            });
            expect(axios.put).not.toHaveBeenCalled();
        });

        it('performs a cast when configured', () => {
            const user = new User({...staticUsers.get(0)});
            expect(user.createdAt).toBeInstanceOf(moment);
        })

        it('can extend two classes', () => {
            const subParameterBuilder = GetRouteBuilder;
            const queryBuilder = new subParameterBuilder();
            queryBuilder.include('unit').include('unit2');
            queryBuilder.filter('unit', 'unit1').filter('bunit', 'bunit1');
            queryBuilder.routeParameter('lala', 'asdf');
        });

        it('can handle single relations', () => {
            const user = {...staticUsers.get(0)};
            user.created_by = {...staticUsers.get(1)};

            const userObject = new User(user);
            expect(userObject.createdBy).toBeInstanceOf(User);
        });

        it('can handle multiple relations', () => {
            const user = {...staticUsers.get(0)};
            user.created_by_multiple = [{...staticUsers.get(0)}, {...staticUsers.get(1)}];

            const userObject = new User(user);
            expect(userObject.createdByMultiple).toBeInstanceOf(Array);
            userObject.createdByMultiple.forEach((value: User) => {
                expect(value).toBeInstanceOf(User);
            });
        });

        it('becomes dirty when modified', () => {
            const user = new User({...staticUsers.first()});
            // @ts-ignore
            expect(user.isDirty).toBeFalsy();

            user.firstName = staticUsers.first().first_name;
            // @ts-ignore
            expect(user.isDirty).toBeFalsy();

            user.firstName = 'Ben';
            // @ts-ignore
            expect(user.isDirty).toBeTruthy();
        });

        it('can handle multiple route parameters', () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: [
                        {...staticUsers.get(0)},
                        {...staticUsers.get(1)}
                    ]
                }
            });

            const users = MultipleRouteParametersEntity.$get((routeBuilder) => {
                expect(routeBuilder).toBeInstanceOf(GetRouteBuilder);
                routeBuilder.routeParameter('unit', 'abc');
            });

            expect(axios.get).toHaveBeenCalledWith(`/api/users/abc`);
        });

        it('can get multiple users', () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: [
                        {...staticUsers.get(0)},
                        {...staticUsers.get(1)}
                    ],
                    meta: {
                        from: 1,
                    }
                },
            });

            const users = User.$get<PaginationCollection<User>>();
            expect(axios.get).toHaveBeenCalledWith(`/api/users`);
            expect(users).resolves.toBeInstanceOf(PaginationCollection);
            users.then((userCollection) => {
                userCollection.entities.each((user, key) => {
                    expect(user.toObject(true)).toEqual(staticUsers.get(parseInt(key as string, 10)));
                })
                expect(userCollection.meta.from).toBe(1);
            });
        });

        it('can find a user', () => {
            const user1: any = staticUsers.first()
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: {...user1}
                }
            });
            const user: Promise<User> = User.$find(user1.uuid);
            expect(axios.get).toHaveBeenCalledWith(`/api/users/${user1.uuid}`);
            expect(user).resolves.toBeInstanceOf(User);
            user.then((user) => {
                expect(user.toObject(true)).toEqual(user1);
            })
        });

        it('can create an entity on the server', () => {
            const user = new User({...staticUsers.first()});
            mockedAxios.post.mockResolvedValueOnce({
                data: {
                    data: {...staticUsers.first()}
                }
            });
            user.$create();
            expect(axios.post).toHaveBeenCalledWith(`/api/users`, {...staticUsers.first()});
        });

        it('can update an entity on the server', () => {
            const user = new User({...staticUsers.first()});
            mockedAxios.put.mockResolvedValueOnce({
                data: {
                    data: {...staticUsers.first()}
                }
            });
            user.$update();
            expect(axios.put).toHaveBeenCalledWith(`/api/users/${user.uuid}`, {...staticUsers.first()});
        });

        it('can partially update an entity on the server', () => {
            const user = new User({...staticUsers.first()});
            const newName = staticUsers.get(1).first_name;
            mockedAxios.put.mockResolvedValueOnce({
                data: {
                    data: {...staticUsers.first()}
                }
            });

            user.firstName = newName;
            user.$patch();
            expect(axios.put).toHaveBeenCalledWith(`/api/users/${user.uuid}`, {first_name: newName});
        });

        it('can paginate entities', () => {
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    data: []
                }
            });

            User.$get((routeBuilder) => {
                routeBuilder.paginate();
            });
            expect(axios.get).toHaveBeenCalledWith(`/api/users?page=1&per_page=15`);
        });

        it('can delete an entity', () => {
            mockedAxios.delete.mockResolvedValueOnce({
                data: {
                    data: {...staticUsers.first()}
                }
            });

            const user = new User();
            user.uuid = staticUsers.first().uuid;
            user.$delete();
            expect(axios.get).toHaveBeenCalledWith(`/api/users/${staticUsers.first().uuid}`);
        });
    });

    it('can sort entities', () => {
        expect(() => {
            User.$get((callback) => {
                expect(callback.sort('unit').handle()).toEqual('sort=unit');
            });
        }).toThrow(TypeError);
    });
})
