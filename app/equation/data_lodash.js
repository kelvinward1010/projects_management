
import * as _ from "lodash/fp";

export default function dataOthers(arr1, arr_check){
    const data = _.differenceWith(arr1 ,arr_check, _.isEqual)

    return data;
}