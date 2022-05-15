"use strict";

var _FAILURE_EVENTS_MAPPI2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// smooth scroll polyfill
(function () {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js';
    var isScriptLoaded = false;
    window.addEventListener('load', function () {
        if (document.body && !isScriptLoaded) {
            document.body.appendChild(script);
        }
    });

    if (document.body) {
        document.body.appendChild(script);
        isScriptLoaded = true;
    }
})();

(function () {
    if (typeof window.CustomEvent === 'function') return false;

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: null
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    window.CustomEvent = CustomEvent;
})();

(function () {
    if (typeof Array.prototype.includes === 'function') return false;

    function includes(value) {
        var returnValue = false;
        var pos = this.indexOf(value);

        if (pos >= 0) {
            returnValue = true;
        }

        return returnValue;
    }

    Array.prototype.includes = includes;
    String.prototype.includes = includes;
})();

(function () {
    if (typeof String.prototype.startsWith === 'function') return false;

    function startsWith(search, rawPos) {
        var pos = rawPos > 0 ? rawPos | 0 : 0;
        return this.substring(pos, pos + search.length) === search;
    }

    String.prototype.startsWith = startsWith;
})();

var ApplePayService = function ApplePayService(context) {
    var _this = this;

    _classCallCheck(this, ApplePayService);

    _defineProperty(this, "initializeSession", function (eventData) {
        var initializeSessionObject = eventData.initializeSessionObject;
        if (!initializeSessionObject || _this.session) return;
        var applePayVersion = initializeSessionObject.applePayVersion,
            paymentRequest = initializeSessionObject.paymentRequest;
        var total = paymentRequest.total;
        var session = new window.ApplePaySession(applePayVersion, paymentRequest);

        session.onvalidatemerchant = function (event) {
            var validationURL = event.validationURL;

            _this.toolkitContext._sendMessage('APPLE_PAY_VALIDATE_MERCHANT', {
                validationURL: validationURL
            });
        };

        session.onpaymentmethodselected = function (_event) {
            var update = {
                newTotal: total
            };
            session.completePaymentMethodSelection(update);
        };

        session.onshippingmethodselected = function (_event) {
            var update = {
                newTotal: total
            };
            session.completeShippingMethodSelection(update);
        };

        session.onshippingcontactselected = function (_event) {
            var update = {
                newTotal: total
            };
            session.completeShippingContactSelection(update);
        };

        session.onpaymentauthorized = function (event) {
            _this.toolkitContext._sendMessage('APPLE_PAY_MAKE_PAYMENT', {
                payment: event.payment
            });
        };

        session.oncancel = function (_event) {
            _this.finishApplePaySession();
        };

        _this.session = session;
        session.begin();
    });

    _defineProperty(this, "completeMerchantValidation", function (eventData) {
        var merchantSession = eventData.merchantSession;
        if (!_this.session) return;

        _this.session.completeMerchantValidation(merchantSession);
    });

    _defineProperty(this, "handlePaymentCompleted", function (eventData) {
        var result = eventData.result;

        if (_this.session) {
            try {
                _this.session.completePayment(result);
            } catch (err) { }
        }

        _this.finishApplePaySession();
    });

    _defineProperty(this, "abortApplePaySession", function () {
        if (_this.session) {
            _this.session.abort();

            _this.finishApplePaySession();
        }
    });

    _defineProperty(this, "finishApplePaySession", function () {
        _this.session = null;
    });

    _defineProperty(this, "isSupportedDevice", function () {
        if (!window.ApplePaySession || location.protocol !== 'https:') return false;
        return window.ApplePaySession.canMakePayments();
    });

    this.toolkitContext = context;
    this.session = null;
};

var RapydToolkit = /*#__PURE__*/function () {
    function RapydToolkit(toolkit) {
        var _this2 = this;

        _classCallCheck(this, RapydToolkit);

        _defineProperty(this, "getUrlByPageType", function (pageType) {
            return _this2.getCurrentPageData(pageType).url;
        });

        _defineProperty(this, "getCurrentPageData", function (pageType) {
            return PAGE_TYPES[pageType];
        });

        _defineProperty(this, "changeLanguage", function (language) {
            _this2._sendMessage('CHANGE_LANGUAGE', {
                language: language
            });
        });

        _defineProperty(this, "_sendMessage", function (type, data) {
            var message = {
                type: type,
                data: data
            };

            _this2.frame.contentWindow.postMessage(message, '*');
        });

        _defineProperty(this, "_sendParentMessage", function (eventName, data) {
            var event = _this2._createCustomEvent(eventName, data);

            window.dispatchEvent(event);
        });

        _defineProperty(this, "_sendParams", function () {
            _this2._sendMessage('PARAMS', {
                btnColor: _this2.btnColor,
                btnText: _this2.btnText,
                saveCardDefault: _this2.saveCardDefault,
                hideCartItems: _this2.hideCartItems,
                hideOrderDetails: _this2.hideOrderDetails,
                customStyles: _this2.style,
                hostname: window.location.hostname,
                redirect: _this2.enableRedirect
            });
        });

        _defineProperty(this, "_initDigitalProviders", function () {
            _this2._sendMessage('INIT_DIGITAL_PROVIDERS', {
                apple_pay_supported: _this2.applePayService.isSupportedDevice()
            });
        });

        _defineProperty(this, "_handleApplePayAction", function (action, eventData) {
            switch (action) {
                case EVENTS.APPLE_PAY_INIT_SESSION.name:
                    _this2.applePayService.initializeSession(eventData);

                    break;

                case EVENTS.APPLE_PAY_ABORT_SESSION.name:
                    _this2.applePayService.abortApplePaySession();

                    break;

                case EVENTS.APPLE_PAY_COMPLETE_MERCHANT_VALIDATION.name:
                    _this2.applePayService.completeMerchantValidation(eventData);

                    break;

                case EVENTS.APPLE_PAY_PAYMENT_COMPLETED.name:
                    _this2.applePayService.handlePaymentCompleted(eventData);

                    break;
            }
        });

        _defineProperty(this, "_handleClose", function () {
            if (!_this2.closeOnComplete) return;
            var openedFrame = document.getElementById('rapyd-checkout-frame');
            if (openedFrame) openedFrame.remove();
        });

        _defineProperty(this, "_createCustomEvent", function (eventName, data) {
            return new CustomEvent(eventName, {
                detail: data
            });
        });

        _defineProperty(this, "_handleLegacyEvents", function (eventName, data) {
            var _ref = data || {},
                pageType = _ref.type,
                eventData = _ref.data; // checkout legacy


            if ([EVENTS.ON_LOADING.name].includes(eventName)) {
                if (pageType === 'checkout') {
                    _this2._sendParentMessage('checkoutOnLoading', {
                        loading: eventData.isLoading
                    });
                }

                return;
            }

            if ([EVENTS.ON_GET_PAGE_FAIL.name].includes(eventName)) {
                if (pageType === 'checkout') {
                    _this2._sendParentMessage('checkoutOnFailed', eventData);

                    return;
                }
            }

            if (Object.keys(CHECKOUT_FAILURE_EVENTS).includes(eventName)) {
                _this2._sendParentMessage('checkoutOnFailed', eventData);

                return;
            }

            if ([EVENTS.CHECKOUT_CREATE_PAYMENT_SUCCESS.name].includes(eventName)) {
                _this2._sendParentMessage('checkoutOnSuccess', eventData);

                return;
            }

            if ([EVENTS.CHECKOUT_EDIT_CARD_SUCCESS.name].includes(eventName)) {
                _this2._sendParentMessage('checkoutOnCardEdit', eventData);

                return;
            }

            if ([EVENTS.CHECKOUT_DELETE_CARD_SUCCESS.name].includes(eventName)) {
                _this2._sendParentMessage('checkoutOnCardDelete', eventData);

                return;
            } // card tokenization legacy


            if ([EVENTS.ON_GET_PAGE_FAIL.name].includes(eventName)) {
                if (pageType === 'card_tokenization') {
                    _this2._sendParentMessage('checkoutOnFailed', eventData);

                    _this2._sendParentMessage('cardTokenizationOnFail', eventData);

                    return;
                }
            }

            if (Object.keys(CARD_TOKENIZATION_FAILURE_EVENTS).includes(eventName)) {
                _this2._sendParentMessage('checkoutOnFailed', eventData);

                _this2._sendParentMessage('cardTokenizationOnFail', eventData);

                return;
            }

            if ([EVENTS.CARD_TOKENIZATION_CREATE_SUCCESS.name].includes(eventName)) {
                _this2._sendParentMessage('cardTokenizationOnSuccess', eventData);

                _this2._sendParentMessage('cardTokenizationOnCreate', eventData);

                return;
            }

            if ([EVENTS.CARD_TOKENIZATION_ON_UPDATE.name].includes(eventName)) {
                _this2._sendParentMessage('cardTokenizationOnUpdate', eventData);

                return;
            } // card issuing legacy


            if ([EVENTS.ISSUING_GET_ISSUED_CARD_SUCCESS.name].includes(eventName)) {
                _this2._sendParentMessage('issuingOnSuccess', eventData);

                return;
            }

            if ([EVENTS.ISSUING_GET_ISSUED_CARD_FAIL.name].includes(eventName)) {
                _this2._sendParentMessage('issuingOnFail', eventData);

                return;
            }
        });

        _defineProperty(this, "_handleEvent", function (eventName, data) {
            var _EVENTS$eventName;

            if (!eventName) return;
            var meta = data.meta,
                eventData = data.data;

            var _ref2 = meta || {},
                closeIframe = _ref2.closeIframe;

            if (closeIframe) {
                _this2._handleClose();
            }

            var mappedEventName = (_EVENTS$eventName = EVENTS[eventName]) === null || _EVENTS$eventName === void 0 ? void 0 : _EVENTS$eventName.mappingName;
            if (!mappedEventName) return;

            _this2._sendParentMessage(mappedEventName, eventData);
        });

        _defineProperty(this, "_handleMessage", function (event) {
            var _eventData$data;

            try {
                var frame;
                var message = event.data || {};
                var eventType = message.type,
                    eventData = message.data;

                _this2._handleLegacyEvents(eventType, eventData);

                switch (eventType) {
                    case EVENTS.IS_MOBILE.name:
                        frame = document.getElementById('rapyd-checkout-frame');
                        frame.style.width = '100%';
                        frame.style.minWidth = 'unset';
                        break;

                    case EVENTS.ON_RESIZE.name:
                        frame = document.getElementById('rapyd-checkout-frame');
                        if (!frame) break;
                        frame.style.height = "".concat(Math.max(message.data.height, 460), "px");
                        break;

                    case EVENTS.GET_PARAMS.name:
                        _this2._sendParams();

                        break;

                    case EVENTS.INIT_DIGITAL_PROVIDERS.name:
                        _this2._initDigitalProviders();

                        break;

                    case EVENTS.APPLE_PAY_INIT_SESSION.name:
                    case EVENTS.APPLE_PAY_ABORT_SESSION.name:
                    case EVENTS.APPLE_PAY_COMPLETE_MERCHANT_VALIDATION.name:
                    case EVENTS.APPLE_PAY_PAYMENT_COMPLETED.name:
                        _this2._handleApplePayAction(eventType, eventData);

                        break;

                    case EVENTS.CLOSE_IFRAME.name:
                        _this2.closeCheckout();

                        break;

                    case EVENTS.ON_LOADING.name:
                        _this2._sendParentMessage(EVENTS.ON_LOADING.mappingName, {
                            loading: (_eventData$data = eventData.data) === null || _eventData$data === void 0 ? void 0 : _eventData$data.isLoading
                        });

                        break;

                    case EVENTS.ON_GET_PAGE_FAIL.name:
                        {
                            var _FAILURE_EVENTS_MAPPI;

                            var _ref3 = eventData || {},
                                pageType = _ref3.type,
                                data = _objectWithoutProperties(_ref3, ["type"]);

                            var failureEventByPageType = (_FAILURE_EVENTS_MAPPI = FAILURE_EVENTS_MAPPING[pageType]) === null || _FAILURE_EVENTS_MAPPI === void 0 ? void 0 : _FAILURE_EVENTS_MAPPI.name;

                            _this2._handleEvent(failureEventByPageType, data);

                            break;
                        }

                    default:
                        _this2._handleEvent(eventType, eventData);

                        break;
                }
            } catch (e) {
                console.error(e);
            }
        });

        try {
            window.addEventListener('message', this._handleMessage, false);
            this.applePayService = new ApplePayService(this);
            this.closeOnComplete = true;
            this.pageType = PAGE_TYPES.checkout.name;
            if (!toolkit) return this;
            this.setCloseOnComplete(toolkit.close_on_complete);
            this.setButtonText(toolkit.button_text);
            this.setButtonColor(toolkit.button_color);
            this.setDefaultSaveCard(toolkit.save_card_default);
            this.setPageType(toolkit.page_type);
            this.setMobileView(toolkit.mobile_view);
            this.setId({
                token: toolkit.id,
                mobile_view: toolkit.mobile_view
            });
            this.setHideCartItems(toolkit.hide_cart_items);
            this.setHideOrderDetails(toolkit.hide_order_details);
            this.setRedirectEnabled(toolkit.redirect);

            if (toolkit.style) {
                this.style = toolkit.style;
            }

            return this;
        } catch (e) {
            throw e;
        }
    }

    _createClass(RapydToolkit, [{
        key: "setPageType",
        value: function setPageType(pageTypeInput) {
            var pageType = pageTypeInput;
            if (!pageType) return;

            if (pageType === 'collection') {
                pageType = PAGE_TYPES.checkout.name;
            }

            if (!Object.keys(PAGE_TYPES).includes(pageType)) throw INVALID_PAGE_TYPE;
            this.pageType = pageType; // overriding url

            if (this.url) {
                this.setId({
                    token: this.currentToken,
                    mobile_view: this.currentMobileView
                });
            }
        }
    }, {
        key: "setButtonColor",
        value: function setButtonColor(color) {
            if (!color) return;
            if (!validTextColour(color)) throw INVALID_COLOR;
            this.btnColor = color;
        }
    }, {
        key: "setButtonText",
        value: function setButtonText(text) {
            if (!text) return;
            if (typeof text !== 'string') throw INVALID_TYPE;
            if (!text || text.length > MAXIMUM_TEXT_CHAR) throw INVALID_TEXT_LENGTH;
            this.btnText = text;
        }
    }, {
        key: "setCloseOnComplete",
        value: function setCloseOnComplete(value) {
            if (typeof value === 'undefined') return;
            if (typeof value !== 'boolean') throw INVALID_TYPE;
            this.closeOnComplete = value;
        }
    }, {
        key: "setDefaultSaveCard",
        value: function setDefaultSaveCard(value) {
            if (typeof value === 'undefined') return;
            if (typeof value !== 'boolean') throw INVALID_TYPE;
            this.saveCardDefault = value;
        }
    }, {
        key: "setMobileView",
        value: function setMobileView(value) {
            if (typeof value === 'undefined') return;
            if (typeof value !== 'boolean') throw INVALID_TYPE;
            this.mobileView = value;
        }
    }, {
        key: "setHideCartItems",
        value: function setHideCartItems(value) {
            if (typeof value === 'undefined') return;
            if (typeof value !== 'boolean') throw INVALID_TYPE;
            this.hideCartItems = value;
        }
    }, {
        key: "setHideOrderDetails",
        value: function setHideOrderDetails(value) {
            if (typeof value === 'undefined') return;
            if (typeof value !== 'boolean') throw INVALID_TYPE;
            this.hideOrderDetails = value;
        }
    }, {
        key: "setRedirectEnabled",
        value: function setRedirectEnabled(value) {
            if (typeof value === 'undefined') return;
            if (typeof value !== 'boolean') throw INVALID_TYPE;
            this.enableRedirect = value;
        }
    }, {
        key: "setId",
        value: function setId(_ref4) {
            var token = _ref4.token,
                mobile_view = _ref4.mobile_view;
            if (!token) return;
            if (typeof token !== 'string') throw INVALID_TYPE;
            this.validateTokenPrefix(token, this.pageType);
            this.currentToken = token;
            this.currentMobileView = mobile_view;
            var mobileViewQueryParam = mobile_view ? "&mobile_view=".concat(mobile_view) : '';
            this.url = this.getUrlByPageType(this.pageType) + token + mobileViewQueryParam;
        }
    }, {
        key: "validateTokenPrefix",
        value: function validateTokenPrefix(token, pageType) {
            var _this$getCurrentPageD = this.getCurrentPageData(pageType),
                prefix = _this$getCurrentPageD.prefix;

            if (!token.startsWith(prefix)) throw INVALID_ID;
        }
    }, {
        key: "displayToolkit",
        value: function displayToolkit() {
            var _this3 = this;

            var frame = window.document.createElement('iframe');
            if (!this.url) throw MISSING_URL;
            frame.setAttribute('src', this.url);
            frame.setAttribute('id', 'rapyd-checkout-frame');
            frame.setAttribute('allow', 'camera');
            frame.frameBorder = 0;
            frame.style.minWidth = this.mobileView ? 'unset' : '500px';
            frame.style.width = '100%';
            frame.style.minHeight = '700px';
            this.frame = frame;
            var toolkitDiv = document.getElementById('rapyd-toolkit');

            if (toolkitDiv) {
                toolkitDiv.appendChild(frame);
            } else {
                try {
                    document.getElementById('rapyd-checkout').appendChild(frame);
                } catch (_unused) {
                    throw MISSING_IFRAME_DIV;
                }
            }

            this.frame.onload = function () {
                _this3.frame.scrollIntoView({
                    behavior: 'smooth'
                });
            };
        }
    }, {
        key: "closeToolkit",
        value: function closeToolkit() {
            try {
                document.getElementById('rapyd-checkout-frame').remove();
            } catch (e) {
                throw CHECKOUT_ALREADY_CLOSED;
            }
        }
    }]);

    return RapydToolkit;
}();

var RapydCheckoutToolkit = /*#__PURE__*/function (_RapydToolkit) {
    _inherits(RapydCheckoutToolkit, _RapydToolkit);

    var _super = _createSuper(RapydCheckoutToolkit);

    function RapydCheckoutToolkit(checkout) {
        var _this4;

        _classCallCheck(this, RapydCheckoutToolkit);

        _this4 = _super.call(this, checkout);

        if (checkout.pay_button_color) {
            _this4.setButtonColor(checkout.pay_button_color);
        }

        if (checkout.pay_button_text) {
            _this4.setButtonText(checkout.pay_button_text);
        }

        return _this4;
    }

    _createClass(RapydCheckoutToolkit, [{
        key: "displayCheckout",
        value: function displayCheckout() {
            this.displayToolkit();
        }
    }, {
        key: "closeCheckout",
        value: function closeCheckout() {
            this.closeToolkit();
        }
    }]);

    return RapydCheckoutToolkit;
}(RapydToolkit);

var INVALID_TYPE = 'INVALID_TYPE';
var INVALID_COLOR = 'INVALID_COLOR';
var INVALID_TEXT_LENGTH = 'INVALID_TEXT_LENGTH';
var MISSING_URL = 'MISSING_URL';
var MISSING_IFRAME_DIV = 'MISSING_IFRAME_DIV';
var CHECKOUT_ALREADY_CLOSED = 'CHECKOUT_ALREADY_CLOSED';
var INVALID_ID = 'INVALID_ID';
var INVALID_PAGE_TYPE = 'INVALID_PAGE_TYPE';
var MAXIMUM_TEXT_CHAR = 16;
var DOMAIN_URL = 'https://sandboxcheckout.rapyd.net';
var URLS = {
    checkout: "".concat(DOMAIN_URL, "?token="),
    beneficiary_tokenization: "".concat(DOMAIN_URL, "/disburse/beneficiary?token="),
    card_tokenization: "".concat(DOMAIN_URL, "/collect/card?token="),
    card_issuing: "".concat(DOMAIN_URL, "/issuing/card_details?token="),
    idv: "".concat(DOMAIN_URL, "/idv?token="),
    card_to_card_tokenize: "".concat(DOMAIN_URL, "/card_to_card/add_source_card?token="),
    card_to_card_transfer: "".concat(DOMAIN_URL, "/card_to_card/transfer?token=")
};
var PREFIXES = {
    checkout: 'checkout_',
    beneficiary_tokenization: 'hp_ben_',
    card_tokenization: 'hp_card_',
    card_issuing: 'hp_issued_',
    idv: 'hp_idv_',
    card_to_card_tokenize: 'hp_c2c_token_',
    card_to_card_transfer: 'hp_c2c_transfer_'
};
var PAGE_TYPES = {
    checkout: {
        name: 'checkout',
        prefix: PREFIXES.checkout,
        url: URLS.checkout
    },
    beneficiary_token: {
        name: 'beneficiary_tokenization',
        prefix: PREFIXES.beneficiary_tokenization,
        url: URLS.beneficiary_tokenization
    },
    card_token: {
        name: 'card_tokenization',
        prefix: PREFIXES.card_tokenization,
        url: URLS.card_tokenization
    },
    card_issuing: {
        name: 'card_issuing',
        prefix: PREFIXES.card_issuing,
        url: URLS.card_issuing
    },
    idv: {
        name: 'idv',
        prefix: PREFIXES.idv,
        url: URLS.idv
    },
    cardtocard_sender: {
        name: 'card_to_card_tokenize',
        prefix: PREFIXES.card_to_card_tokenize,
        url: URLS.card_to_card_tokenize
    },
    cardtocard_transfer: {
        name: 'card_to_card_transfer',
        prefix: PREFIXES.card_to_card_transfer,
        url: URLS.card_to_card_transfer
    }
};

var validTextColour = function validTextColour(color) {
    if (!color) return false;
    if (color === '') return false;
    if (color === 'inherit') return false;
    if (color === 'transparent') return false;
    var image = document.createElement('img');
    image.style.color = 'rgb(0, 0, 0)';
    image.style.color = color;
    if (image.style.color !== 'rgb(0, 0, 0)') return true;
    image.style.color = 'rgb(255, 255, 255)';
    image.style.color = color;
    return image.style.color !== 'rgb(255, 255, 255)';
};

var GLOBAL_EVENTS = {
    IS_MOBILE: {
        name: 'IS_MOBILE',
        mappingName: ''
    },
    ON_RESIZE: {
        name: 'ON_RESIZE',
        mappingName: ''
    },
    GET_PARAMS: {
        name: 'GET_PARAMS',
        mappingName: ''
    },
    INIT_DIGITAL_PROVIDERS: {
        name: 'INIT_DIGITAL_PROVIDERS',
        mappingName: ''
    },
    CLOSE_IFRAME: {
        name: 'CLOSE_IFRAME',
        mappingName: ''
    },
    ON_GET_PAGE_FAIL: {
        name: 'ON_GET_PAGE_FAIL',
        mappingName: ''
    },
    ON_FAILURE: {
        name: 'ON_FAILURE',
        mappingName: 'onFailure'
    },
    ON_LOADING: {
        name: 'ON_LOADING',
        mappingName: 'onLoading'
    }
};
var APPLE_PAY_EVENTS = {
    APPLE_PAY_INIT_SESSION: {
        name: 'APPLE_PAY_INIT_SESSION',
        mappingName: ''
    },
    APPLE_PAY_ABORT_SESSION: {
        name: 'APPLE_APY_ABORT_SESSION',
        mappingName: ''
    },
    APPLE_PAY_COMPLETE_MERCHANT_VALIDATION: {
        name: 'APPLE_PAY_COMPLETE_MERCHANT_VALIDATION',
        mappingName: ''
    },
    APPLE_PAY_PAYMENT_COMPLETED: {
        name: 'APPLE_PAY_PAYMENT_COMPLETED',
        mappingName: ''
    }
};
var CHECKOUT_FAILURE_EVENTS = {
    CHECKOUT_ON_FAILURE: {
        name: 'CHECKOUT_ON_FAILURE',
        mappingName: 'onCheckoutFailure'
    },
    CHECKOUT_CREATE_PAYMENT_FAIL: {
        name: 'CHECKOUT_CREATE_PAYMENT_FAIL',
        mappingName: 'onCheckoutPaymentFailure'
    },
    CHECKOUT_EDIT_CARD_FAIL: {
        name: 'CHECKOUT_EDIT_CARD_FAIL',
        mappingName: 'onCheckoutUpdateCardFailure'
    },
    CHECKOUT_DELETE_CARD_FAIL: {
        name: 'CHECKOUT_DELETE_CARD_FAIL',
        mappingName: 'onCheckoutDeleteCardFailure'
    }
};

var CHECKOUT_EVENTS = _objectSpread(_objectSpread(_objectSpread({}, CHECKOUT_FAILURE_EVENTS), APPLE_PAY_EVENTS), {}, {
    CHECKOUT_CREATE_PAYMENT_SUCCESS: {
        name: 'CHECKOUT_CREATE_PAYMENT_SUCCESS',
        mappingName: 'onCheckoutPaymentSuccess'
    },
    CHECKOUT_EDIT_CARD_SUCCESS: {
        name: 'CHECKOUT_EDIT_CARD_SUCCESS',
        mappingName: 'onCheckoutUpdateCardSuccess'
    },
    CHECKOUT_DELETE_CARD_SUCCESS: {
        name: 'CHECKOUT_DELETE_CARD_SUCCESS',
        mappingName: 'onCheckoutDeleteCardSuccess'
    }
});

var CARD_TOKENIZATION_FAILURE_EVENTS = {
    CARD_TOKENIZATION_ON_FAILURE: {
        name: 'CARD_TOKENIZATION_ON_FAILURE',
        mappingName: 'onCardDetailsFailure'
    },
    CARD_TOKENIZATION_CREATE_FAIL: {
        name: 'CARD_TOKENIZATION_CREATE_FAIL',
        mappingName: 'onSaveCardDetailsFailure'
    }
};

var CARD_TOKENIZATION_EVENTS = _objectSpread(_objectSpread({}, CARD_TOKENIZATION_FAILURE_EVENTS), {}, {
    CARD_TOKENIZATION_CREATE_SUCCESS: {
        name: 'CARD_TOKENIZATION_CREATE_SUCCESS',
        mappingName: 'onSaveCardDetailsSuccess'
    },
    CARD_TOKENIZATION_ON_UPDATE: {
        name: 'CARD_TOKENIZATION_ON_UPDATE',
        mappingName: 'onUpdateCardSuccess'
    }
});

var BENEFICIARY_TOKENIZATION_EVENTS = {
    BENEFICIARY_TOKENIZATION_ON_FAILURE: {
        name: 'BENEFICIARY_TOKENIZATION_ON_FAILURE',
        mappingName: 'onBeneficiaryFailure'
    },
    BENEFICIARY_CREATE_SUCCESS: {
        name: 'BENEFICIARY_CREATE_SUCCESS',
        mappingName: 'onCreateBeneficiarySuccess'
    },
    BENEFICIARY_CREATE_FAIL: {
        name: 'BENEFICIARY_CREATE_FAIL',
        mappingName: 'onCreateBeneficiaryFailure'
    }
};
var ISSUING_EVENTS = {
    ISSUING_ON_FAILURE: {
        name: 'ISSUING_ON_FAILURE',
        mappingName: 'onIssuedCardDetailsFailure'
    },
    ISSUING_GET_ISSUED_CARD_SUCCESS: {
        name: 'ISSUING_GET_ISSUED_CARD_SUCCESS',
        mappingName: 'onDisplayIssuedCardDetailsSuccess'
    },
    ISSUING_GET_ISSUED_CARD_FAIL: {
        name: 'ISSUING_GET_ISSUED_CARD_FAIL',
        mappingName: 'onDisplayIssuedCardDetailsFailure'
    }
};
var IDV_EVENTS = {
    IDV_ON_FAILURE: {
        name: 'IDV_ON_FAILURE',
        mappingName: 'onIdvFailure'
    },
    IDV_SUBMIT_SUCCESS: {
        name: 'IDV_SUBMIT_SUCCESS',
        mappingName: 'onSubmitIdvSuccess'
    },
    IDV_SUBMIT_FAIL: {
        name: 'IDV_SUBMIT_FAIL',
        mappingName: 'onSubmitIdvFailure'
    }
};
var CARD_TO_CARD_TOKENIZE_EVENTS = {
    CARD_TO_CARD_TOKENIZE_FAILURE: {
        name: 'CARD_TO_CARD_TOKENIZE_FAILURE',
        mappingName: 'onCardToCardFailure'
    },
    ADD_SOURCE_CARD_SUCCESS: {
        name: 'ADD_SOURCE_CARD_SUCCESS',
        mappingName: 'onCardToCardSaveSourceCardSuccess'
    },
    ADD_SOURCE_CARD_FAIL: {
        name: 'ADD_SOURCE_CARD_FAIL',
        mappingName: 'onCardToCardSaveSourceCardFailure'
    },
    ADD_SOURCE_CARD_REDIRECT_SUCCESS: {
        name: 'ADD_SOURCE_CARD_REDIRECT_SUCCESS',
        mappingName: 'onCardToCardSaveSourceCardAfterRedirectSuccess'
    },
    ADD_SOURCE_CARD_REDIRECT_FAIL: {
        name: 'ADD_SOURCE_CARD_REDIRECT_FAIL',
        mappingName: 'onCardToCardSaveSourceCardAfterRedirectFailure'
    }
};
var CARD_TO_CARD_TRANSFER_EVENTS = {
    GET_CARD_TO_CARD_TRANSFER_PAGE_FAIL: {
        name: 'GET_CARD_TO_CARD_TRANSFER_PAGE_FAIL',
        mappingName: 'onCardToCardGetTransferPageFailure'
    },
    TRANSFER_CARD_TO_CARD_FUNDS_SUCCESS: {
        name: 'TRANSFER_CARD_TO_CARD_FUNDS_SUCCESS',
        mappingName: 'onCardToCardPaymentSuccess'
    },
    TRANSFER_CARD_TO_CARD_FUNDS_FAIL: {
        name: 'TRANSFER_CARD_TO_CARD_FUNDS_FAIL',
        mappingName: 'onCardToCardPaymentFailure'
    },
    TRANSFER_CARD_TO_CARD_FUNDS_3DS_SUCCESS: {
        name: 'TRANSFER_CARD_TO_CARD_FUNDS_3DS_SUCCESS',
        mappingName: 'onCardToCardPaymentSuccess'
    },
    TRANSFER_CARD_TO_CARD_FUNDS_3DS_FAIL: {
        name: 'TRANSFER_CARD_TO_CARD_FUNDS_3DS_FAIL',
        mappingName: 'onCardToCardPaymentFailure'
    },
    TRANSFER_CARD_TO_CARD_FUNDS_3DS_PENDING: {
        name: 'TRANSFER_CARD_TO_CARD_FUNDS_3DS_PENDING',
        mappingName: 'onCardToCardPaymentPending'
    }
};

var EVENTS = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, GLOBAL_EVENTS), CHECKOUT_EVENTS), CARD_TOKENIZATION_EVENTS), BENEFICIARY_TOKENIZATION_EVENTS), ISSUING_EVENTS), IDV_EVENTS), CARD_TO_CARD_TOKENIZE_EVENTS), CARD_TO_CARD_TRANSFER_EVENTS);

var FAILURE_EVENTS_MAPPING = (_FAILURE_EVENTS_MAPPI2 = {}, _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.checkout.name, EVENTS.CHECKOUT_ON_FAILURE), _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.beneficiary_token.name, EVENTS.BENEFICIARY_TOKENIZATION_ON_FAILURE), _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.card_token.name, EVENTS.CARD_TOKENIZATION_ON_FAILURE), _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.card_issuing.name, EVENTS.ISSUING_ON_FAILURE), _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.idv.name, EVENTS.IDV_ON_FAILURE), _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.cardtocard_sender.name, EVENTS.CARD_TO_CARD_TOKENIZE_FAILURE), _defineProperty(_FAILURE_EVENTS_MAPPI2, PAGE_TYPES.cardtocard_transfer.name, EVENTS.GET_CARD_TO_CARD_TRANSFER_PAGE_FAIL), _FAILURE_EVENTS_MAPPI2);
