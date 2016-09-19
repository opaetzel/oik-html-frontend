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
            if (rowIndex === 0 && left) {
                colClass=negClass+" bg";
            }
            if (rowIndex === 2 && !left) {
                colClass=posClass+" bg";
            }
            break;
        case "presentation":
            if (rowIndex === 0 && !left) {
                colClass=posClass+" bg";
            }
            if (rowIndex === 1 && left) {
                colClass=negClass+" bg";
            }
            break;
        case "hearing-pro":
            colClass=negClass;
            if (rowIndex%2 === 0) {
                if(left) {
                    colClass+=" bg";
                }
            } else {
                if (!left) {
                    colClass+=" bg";
                }
            }
            break;
        case "hearing-con":
            colClass=posClass;
            if (rowIndex%2 === 0) {
                if(!left) {
                    colClass+=" bg";
                }
            } else {
                if (left) {
                    colClass+=" bg";
                }
            }
            break;
        case "synthesis":
            if(rowIndex === 0) {
                if(!left) {
                    colClass=posClass+" bg";
                }
            }
            if(rowIndex === 1) {
                if(left) {
                    colClass=negClass+" bg";
                }
            }
            break;
        default:
            break;
    }
    return colClass;
}

export default Ember.Helper.helper(genColClass);
