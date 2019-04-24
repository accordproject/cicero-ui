"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _semanticUiReact = require("semantic-ui-react");

var _TemplateActions = _interopRequireDefault(require("./TemplateActions"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 400px;\n  margin: auto;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-left: 10px;\n  font-size: 12px;\n  font-weight: 300;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute !important;\n  top: 13px;\n  right: 16px;\n  max-height: 23px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  text-align: left;\n  min-height: 120px;\n  box-shadow: 0 1px 9px 0 rgba(0,0,0,0.1);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CardContainer = (0, _styledComponents["default"])(_semanticUiReact.Card)(_templateObject());
var TemplateLogo = (0, _styledComponents["default"])(_semanticUiReact.Image)(_templateObject2());

var Version = _styledComponents["default"].span(_templateObject3());

var DescriptionContainer = (0, _styledComponents["default"])(_semanticUiReact.Card.Description)(_templateObject4());
/**
 * A Template Card component that will display the each template
 * and it's details.
 */

var TemplateCard =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(TemplateCard, _React$Component);

  function TemplateCard() {
    (0, _classCallCheck2["default"])(this, TemplateCard);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TemplateCard).apply(this, arguments));
  }

  (0, _createClass2["default"])(TemplateCard, [{
    key: "render",

    /**
       * Render this React component
       * @return {*} the react component
    */
    value: function render() {
      var template = this.props.template;
      return _react["default"].createElement(CardContainer, {
        fluid: true,
        key: template.uri
      }, _react["default"].createElement(_semanticUiReact.Card.Content, null, _react["default"].createElement(TemplateLogo, {
        src: template.icon
      }), _react["default"].createElement(_semanticUiReact.Card.Header, null, template.name, _react["default"].createElement(Version, null, "v ", template.version)), _react["default"].createElement(DescriptionContainer, null, template.description)), _react["default"].createElement(_TemplateActions["default"], {
        addToCont: this.props.addToCont,
        uriKey: template.uri,
        handleViewDetails: this.props.handleViewTemplate
      }));
    }
  }]);
  return TemplateCard;
}(_react["default"].Component);
/**
 * The property types for this component
 */


TemplateCard.propTypes = {
  template: _propTypes["default"].object,
  addToCont: _propTypes["default"].func,
  handleViewTemplate: _propTypes["default"].func
};
var _default = TemplateCard;
exports["default"] = _default;