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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _semanticUiReact = require("semantic-ui-react");

var _TemplateCard = _interopRequireDefault(require("./TemplateCard"));

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: 20px 0 0 0;\n  width: 100%;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  max-width: 272px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: 0 20px 0 0;\n  width: 136px;\n  float: left;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: 16px 0;\n  max-width: 430px;\n  font-family: 'IBM Plex Sans', sans-serif;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  font-weight: 300;\n  float: right;\n  margin: 0 16px 0 0;\n  text-decoration: underline;\n  font-size: 14px;\n  color: #76777D;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  font-family: 'IBM Plex Sans', sans-serif;\n  font-weight: 800;\n  font-size: 16px;\n  max-width: 442px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  margin: 16px 16px;\n  font-family: 'IBM Plex Sans', sans-serif;\n  max-width: 442px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var TemplatesWrapper = _styledComponents["default"].div(_templateObject());

var Header = _styledComponents["default"].div(_templateObject2());

var UploadImport = _styledComponents["default"].a(_templateObject3());

var Functionality = _styledComponents["default"].div(_templateObject4());

var SearchInput = (0, _styledComponents["default"])(_semanticUiReact.Input)(_templateObject5());
var AddClauseBtn = (0, _styledComponents["default"])(_semanticUiReact.Button)(_templateObject6());
var TemplateCards = (0, _styledComponents["default"])(_semanticUiReact.Card.Group)(_templateObject7());

var loadAPTemplateLibrary =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var templateLibrary, templateIndex, templateIndexArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            templateLibrary = new TemplateLibrary();
            _context.next = 3;
            return templateLibrary.getTemplateIndex({
              latestVersion: false,
              ciceroVersion: ciceroVersion
            });

          case 3:
            templateIndex = _context.sent;
            templateIndexArray = Object.values(templateIndex);
            return _context.abrupt("return", Promise.resolve(templateIndexArray));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadAPTemplateLibrary() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * A Template Library component that will display the filtered list of templates
 * and provide drag-and-drop functionality.
 */


var TemplateLibraryComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2["default"])(TemplateLibraryComponent, _React$PureComponent);

  function TemplateLibraryComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TemplateLibraryComponent);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TemplateLibraryComponent).call(this, props));
    _this.state = {
      query: '',
      templates: []
    };
    _this.onQueryChange = _this.onQueryChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(TemplateLibraryComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      loadAPTemplateLibrary().then(function (templates) {
        _this2.props.outputTemplates(templates);
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "onQueryChange",
    value: function onQueryChange(e, el) {
      this.setState({
        query: el.value
      });
    }
    /**
     * Render this React component
     * @return {*} the react component
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement("div", null, _react["default"].createElement(TemplatesWrapper, null, _react["default"].createElement(Header, null, "Clause Templates", this.props["import"] && _react["default"].createElement(UploadImport, {
        onClick: this.props["import"],
        href: "javascript:void(0);"
      }, "Import from VS Code"), this.props.upload && _react["default"].createElement(UploadImport, {
        onClick: this.props.upload,
        href: "javascript:void(0);"
      }, "Upload CTA file")), _react["default"].createElement(Functionality, null, _react["default"].createElement(SearchInput, {
        className: "icon",
        fluid: true,
        icon: "search",
        placeholder: "Search...",
        onChange: this.onQueryChange
      }), _react["default"].createElement(AddClauseBtn, {
        content: "New Clause Template",
        color: "blue",
        fluid: true,
        icon: "plus",
        id: "addClauseBtn",
        onClick: this.props.addTemp
      })), _react["default"].createElement(TemplateCards, null, _lodash["default"].sortBy(this.props.templates, ['name']).map(function (t) {
        return _react["default"].createElement(_TemplateCard["default"], {
          key: t.uri,
          addToCont: _this3.props.addToCont,
          template: t,
          handleViewTemplate: _this3.handleViewTemplate
        });
      }))));
    }
  }]);
  return TemplateLibraryComponent;
}(_react["default"].PureComponent);

(0, _defineProperty2["default"])(TemplateLibraryComponent, "propTypes", {
  upload: _propTypes["default"].func,
  "import": _propTypes["default"].func,
  addTemp: _propTypes["default"].func,
  addToCont: _propTypes["default"].func,
  templates: _propTypes["default"].arrayOf(_propTypes["default"].object),
  outputTemplates: _propTypes["default"].func
});
var _default = TemplateLibraryComponent;
exports["default"] = _default;