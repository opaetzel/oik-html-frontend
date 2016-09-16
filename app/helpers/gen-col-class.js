import Ember from 'ember';

/**
 * params should be:
 * [0]: page-type
 * [1]: column-index
 * [3]: unit.color_scheme
 **/
export function genColClass(params/*, hash*/) {
    let pageType = params[0];
    let rowIndex = parseInt(params[1]);
    let left = params[2];
    let colorScheme = params[3];
    let negClass = "colors-"+colorScheme + " neg";
    let posClass = "colors-"+colorScheme + " pos";
    let colClass="";
    console.log(pageType, params[1]);
    switch(pageType) {
        case "opening":
            if (rowIndex == 0 && left) {
                colClass=negClass;
            }
            if (rowIndex == 2 && !left) {
                colClass=posClass;
            }
            break;
        case "presentation":
            if (rowIndex == 0 && !left) {
                colClass=posClass;
            }
            if (rowIndex == 1 && left) {
                colClass=negClass;
            }
            break;
        case "hearing-pro":
            if (rowIndex%2 === 0) {
                if(left) {
                    colClass=negClass;
                }
            } else {
                if (!left) {
                    colClass=negClass;
                }
            }
            break;
        case "hearing-con":
            if (rowIndex%2 === 0) {
                if(!left) {
                    colClass=posClass;
                }
            } else {
                if (left) {
                    colClass=posClass;
                }
            }
            break;
        case "synthesis":
            if(rowIndex === 0) {
                if(!left) {
                    colClass=posClass;
                }
            }
            if(rowIndex === 1) {
                if(left) {
                    colClass=negClass;
                }
            }
            break;
        default:
            break;
    }
    return colClass;
}

export default Ember.Helper.helper(genColClass);
