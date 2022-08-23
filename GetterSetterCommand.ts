import {User} from "./src/__tests_data__/Support/UserEntity";
import {GetterAndSetterCommand} from "./src";
import {GetterAndSetterBag} from "./src";

const getterAndSetterBag = new GetterAndSetterBag();
getterAndSetterBag.push(User, __dirname + '/src/__tests_data__/Support/UserEntity.ts');
const getSetCommand: GetterAndSetterCommand = new GetterAndSetterCommand(getterAndSetterBag);
getSetCommand.handle("\n");