"use client";
import {
  DismissableLayer
} from "./chunk-QOABGWLW.js";
import {
  Presence,
  composeEventHandlers,
  createCollection,
  useControllableState,
  useDirection,
  useId
} from "./chunk-CZYB6FDE.js";
import {
  useCallbackRef,
  useLayoutEffect2
} from "./chunk-AEUQ5J2I.js";
import {
  composeRefs,
  useComposedRefs
} from "./chunk-3RKDWLCG.js";
import {
  require_react_dom
} from "./chunk-EKFKCRXB.js";
import {
  require_jsx_runtime
} from "./chunk-J3XBGEQK.js";
import {
  require_react
} from "./chunk-ULSRCYB6.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@radix-ui/react-navigation-menu/dist/index.mjs
var React8 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/@radix-ui/react-navigation-menu/node_modules/@radix-ui/react-context/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = React.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = React.useMemo(() => context, Object.values(context));
      return (0, import_jsx_runtime.jsx)(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

// node_modules/@radix-ui/react-navigation-menu/node_modules/@radix-ui/react-primitive/dist/index.mjs
var React3 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);

// node_modules/@radix-ui/react-navigation-menu/node_modules/@radix-ui/react-slot/dist/index.mjs
var React2 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function createSlot(ownerName) {
  const SlotClone = createSlotClone(ownerName);
  const Slot22 = React2.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React2.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React2.Children.count(newElement) > 1) return React2.Children.only(null);
          return React2.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return (0, import_jsx_runtime2.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: React2.isValidElement(newElement) ? React2.cloneElement(newElement, void 0, newChildren) : null });
    }
    return (0, import_jsx_runtime2.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot22.displayName = `${ownerName}.Slot`;
  return Slot22;
}
var Slot = createSlot("Slot");
function createSlotClone(ownerName) {
  const SlotClone = React2.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React2.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React2.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React2.cloneElement(children, props2);
    }
    return React2.Children.count(children) > 1 ? React2.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function createSlottable(ownerName) {
  const Slottable22 = ({ children }) => {
    return (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children });
  };
  Slottable22.displayName = `${ownerName}.Slottable`;
  Slottable22.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable22;
}
var Slottable = createSlottable("Slottable");
function isSlottable(child) {
  return React2.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// node_modules/@radix-ui/react-navigation-menu/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot3 = createSlot(`Primitive.${node}`);
  const Node = React3.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot3 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return (0, import_jsx_runtime3.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}

// node_modules/@radix-ui/react-use-previous/dist/index.mjs
var React4 = __toESM(require_react(), 1);
function usePrevious(value) {
  const ref = React4.useRef({ value, previous: value });
  return React4.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

// node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var React7 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-primitive/dist/index.mjs
var React6 = __toESM(require_react(), 1);
var ReactDOM2 = __toESM(require_react_dom(), 1);

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-slot/dist/index.mjs
var React5 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function createSlot2(ownerName) {
  const SlotClone = createSlotClone2(ownerName);
  const Slot22 = React5.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React5.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable2);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React5.Children.count(newElement) > 1) return React5.Children.only(null);
          return React5.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return (0, import_jsx_runtime4.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: React5.isValidElement(newElement) ? React5.cloneElement(newElement, void 0, newChildren) : null });
    }
    return (0, import_jsx_runtime4.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot22.displayName = `${ownerName}.Slot`;
  return Slot22;
}
var Slot2 = createSlot2("Slot");
function createSlotClone2(ownerName) {
  const SlotClone = React5.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React5.isValidElement(children)) {
      const childrenRef = getElementRef2(children);
      const props2 = mergeProps2(slotProps, children.props);
      if (children.type !== React5.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React5.cloneElement(children, props2);
    }
    return React5.Children.count(children) > 1 ? React5.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER2 = Symbol("radix.slottable");
function createSlottable2(ownerName) {
  const Slottable22 = ({ children }) => {
    return (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children });
  };
  Slottable22.displayName = `${ownerName}.Slottable`;
  Slottable22.__radixId = SLOTTABLE_IDENTIFIER2;
  return Slottable22;
}
var Slottable2 = createSlottable2("Slottable");
function isSlottable2(child) {
  return React5.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER2;
}
function mergeProps2(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var NODES2 = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive2 = NODES2.reduce((primitive, node) => {
  const Slot3 = createSlot2(`Primitive.${node}`);
  const Node = React6.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot3 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return (0, import_jsx_runtime5.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});

// node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = React7.forwardRef(
  (props, forwardedRef) => {
    return (0, import_jsx_runtime6.jsx)(
      Primitive2.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var Root = VisuallyHidden;

// node_modules/@radix-ui/react-navigation-menu/dist/index.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var NAVIGATION_MENU_NAME = "NavigationMenu";
var [Collection, useCollection, createCollectionScope] = createCollection(NAVIGATION_MENU_NAME);
var [FocusGroupCollection, useFocusGroupCollection, createFocusGroupCollectionScope] = createCollection(NAVIGATION_MENU_NAME);
var [createNavigationMenuContext, createNavigationMenuScope] = createContextScope(
  NAVIGATION_MENU_NAME,
  [createCollectionScope, createFocusGroupCollectionScope]
);
var [NavigationMenuProviderImpl, useNavigationMenuContext] = createNavigationMenuContext(NAVIGATION_MENU_NAME);
var [ViewportContentProvider, useViewportContentContext] = createNavigationMenuContext(NAVIGATION_MENU_NAME);
var NavigationMenu = React8.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeNavigationMenu,
      value: valueProp,
      onValueChange,
      defaultValue,
      delayDuration = 200,
      skipDelayDuration = 300,
      orientation = "horizontal",
      dir,
      ...NavigationMenuProps
    } = props;
    const [navigationMenu, setNavigationMenu] = React8.useState(null);
    const composedRef = useComposedRefs(forwardedRef, (node) => setNavigationMenu(node));
    const direction = useDirection(dir);
    const openTimerRef = React8.useRef(0);
    const closeTimerRef = React8.useRef(0);
    const skipDelayTimerRef = React8.useRef(0);
    const [isOpenDelayed, setIsOpenDelayed] = React8.useState(true);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: (value2) => {
        const isOpen = value2 !== "";
        const hasSkipDelayDuration = skipDelayDuration > 0;
        if (isOpen) {
          window.clearTimeout(skipDelayTimerRef.current);
          if (hasSkipDelayDuration) setIsOpenDelayed(false);
        } else {
          window.clearTimeout(skipDelayTimerRef.current);
          skipDelayTimerRef.current = window.setTimeout(
            () => setIsOpenDelayed(true),
            skipDelayDuration
          );
        }
        onValueChange?.(value2);
      },
      defaultProp: defaultValue ?? "",
      caller: NAVIGATION_MENU_NAME
    });
    const startCloseTimer = React8.useCallback(() => {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = window.setTimeout(() => setValue(""), 150);
    }, [setValue]);
    const handleOpen = React8.useCallback(
      (itemValue) => {
        window.clearTimeout(closeTimerRef.current);
        setValue(itemValue);
      },
      [setValue]
    );
    const handleDelayedOpen = React8.useCallback(
      (itemValue) => {
        const isOpenItem = value === itemValue;
        if (isOpenItem) {
          window.clearTimeout(closeTimerRef.current);
        } else {
          openTimerRef.current = window.setTimeout(() => {
            window.clearTimeout(closeTimerRef.current);
            setValue(itemValue);
          }, delayDuration);
        }
      },
      [value, setValue, delayDuration]
    );
    React8.useEffect(() => {
      return () => {
        window.clearTimeout(openTimerRef.current);
        window.clearTimeout(closeTimerRef.current);
        window.clearTimeout(skipDelayTimerRef.current);
      };
    }, []);
    return (0, import_jsx_runtime7.jsx)(
      NavigationMenuProvider,
      {
        scope: __scopeNavigationMenu,
        isRootMenu: true,
        value,
        dir: direction,
        orientation,
        rootNavigationMenu: navigationMenu,
        onTriggerEnter: (itemValue) => {
          window.clearTimeout(openTimerRef.current);
          if (isOpenDelayed) handleDelayedOpen(itemValue);
          else handleOpen(itemValue);
        },
        onTriggerLeave: () => {
          window.clearTimeout(openTimerRef.current);
          startCloseTimer();
        },
        onContentEnter: () => window.clearTimeout(closeTimerRef.current),
        onContentLeave: startCloseTimer,
        onItemSelect: (itemValue) => {
          setValue((prevValue) => prevValue === itemValue ? "" : itemValue);
        },
        onItemDismiss: () => setValue(""),
        children: (0, import_jsx_runtime7.jsx)(
          Primitive.nav,
          {
            "aria-label": "Main",
            "data-orientation": orientation,
            dir: direction,
            ...NavigationMenuProps,
            ref: composedRef
          }
        )
      }
    );
  }
);
NavigationMenu.displayName = NAVIGATION_MENU_NAME;
var SUB_NAME = "NavigationMenuSub";
var NavigationMenuSub = React8.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeNavigationMenu,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      ...subProps
    } = props;
    const context = useNavigationMenuContext(SUB_NAME, __scopeNavigationMenu);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: SUB_NAME
    });
    return (0, import_jsx_runtime7.jsx)(
      NavigationMenuProvider,
      {
        scope: __scopeNavigationMenu,
        isRootMenu: false,
        value,
        dir: context.dir,
        orientation,
        rootNavigationMenu: context.rootNavigationMenu,
        onTriggerEnter: (itemValue) => setValue(itemValue),
        onItemSelect: (itemValue) => setValue(itemValue),
        onItemDismiss: () => setValue(""),
        children: (0, import_jsx_runtime7.jsx)(Primitive.div, { "data-orientation": orientation, ...subProps, ref: forwardedRef })
      }
    );
  }
);
NavigationMenuSub.displayName = SUB_NAME;
var NavigationMenuProvider = (props) => {
  const {
    scope,
    isRootMenu,
    rootNavigationMenu,
    dir,
    orientation,
    children,
    value,
    onItemSelect,
    onItemDismiss,
    onTriggerEnter,
    onTriggerLeave,
    onContentEnter,
    onContentLeave
  } = props;
  const [viewport, setViewport] = React8.useState(null);
  const [viewportContent, setViewportContent] = React8.useState(/* @__PURE__ */ new Map());
  const [indicatorTrack, setIndicatorTrack] = React8.useState(null);
  return (0, import_jsx_runtime7.jsx)(
    NavigationMenuProviderImpl,
    {
      scope,
      isRootMenu,
      rootNavigationMenu,
      value,
      previousValue: usePrevious(value),
      baseId: useId(),
      dir,
      orientation,
      viewport,
      onViewportChange: setViewport,
      indicatorTrack,
      onIndicatorTrackChange: setIndicatorTrack,
      onTriggerEnter: useCallbackRef(onTriggerEnter),
      onTriggerLeave: useCallbackRef(onTriggerLeave),
      onContentEnter: useCallbackRef(onContentEnter),
      onContentLeave: useCallbackRef(onContentLeave),
      onItemSelect: useCallbackRef(onItemSelect),
      onItemDismiss: useCallbackRef(onItemDismiss),
      onViewportContentChange: React8.useCallback((contentValue, contentData) => {
        setViewportContent((prevContent) => {
          prevContent.set(contentValue, contentData);
          return new Map(prevContent);
        });
      }, []),
      onViewportContentRemove: React8.useCallback((contentValue) => {
        setViewportContent((prevContent) => {
          if (!prevContent.has(contentValue)) return prevContent;
          prevContent.delete(contentValue);
          return new Map(prevContent);
        });
      }, []),
      children: (0, import_jsx_runtime7.jsx)(Collection.Provider, { scope, children: (0, import_jsx_runtime7.jsx)(ViewportContentProvider, { scope, items: viewportContent, children }) })
    }
  );
};
var LIST_NAME = "NavigationMenuList";
var NavigationMenuList = React8.forwardRef(
  (props, forwardedRef) => {
    const { __scopeNavigationMenu, ...listProps } = props;
    const context = useNavigationMenuContext(LIST_NAME, __scopeNavigationMenu);
    const list = (0, import_jsx_runtime7.jsx)(Primitive.ul, { "data-orientation": context.orientation, ...listProps, ref: forwardedRef });
    return (0, import_jsx_runtime7.jsx)(Primitive.div, { style: { position: "relative" }, ref: context.onIndicatorTrackChange, children: (0, import_jsx_runtime7.jsx)(Collection.Slot, { scope: __scopeNavigationMenu, children: context.isRootMenu ? (0, import_jsx_runtime7.jsx)(FocusGroup, { asChild: true, children: list }) : list }) });
  }
);
NavigationMenuList.displayName = LIST_NAME;
var ITEM_NAME = "NavigationMenuItem";
var [NavigationMenuItemContextProvider, useNavigationMenuItemContext] = createNavigationMenuContext(ITEM_NAME);
var NavigationMenuItem = React8.forwardRef(
  (props, forwardedRef) => {
    const { __scopeNavigationMenu, value: valueProp, ...itemProps } = props;
    const autoValue = useId();
    const value = valueProp || autoValue || "LEGACY_REACT_AUTO_VALUE";
    const contentRef = React8.useRef(null);
    const triggerRef = React8.useRef(null);
    const focusProxyRef = React8.useRef(null);
    const restoreContentTabOrderRef = React8.useRef(() => {
    });
    const wasEscapeCloseRef = React8.useRef(false);
    const handleContentEntry = React8.useCallback((side = "start") => {
      if (contentRef.current) {
        restoreContentTabOrderRef.current();
        const candidates = getTabbableCandidates(contentRef.current);
        if (candidates.length) focusFirst(side === "start" ? candidates : candidates.reverse());
      }
    }, []);
    const handleContentExit = React8.useCallback(() => {
      if (contentRef.current) {
        const candidates = getTabbableCandidates(contentRef.current);
        if (candidates.length) restoreContentTabOrderRef.current = removeFromTabOrder(candidates);
      }
    }, []);
    return (0, import_jsx_runtime7.jsx)(
      NavigationMenuItemContextProvider,
      {
        scope: __scopeNavigationMenu,
        value,
        triggerRef,
        contentRef,
        focusProxyRef,
        wasEscapeCloseRef,
        onEntryKeyDown: handleContentEntry,
        onFocusProxyEnter: handleContentEntry,
        onRootContentClose: handleContentExit,
        onContentFocusOutside: handleContentExit,
        children: (0, import_jsx_runtime7.jsx)(Primitive.li, { ...itemProps, ref: forwardedRef })
      }
    );
  }
);
NavigationMenuItem.displayName = ITEM_NAME;
var TRIGGER_NAME = "NavigationMenuTrigger";
var NavigationMenuTrigger = React8.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, disabled, ...triggerProps } = props;
  const context = useNavigationMenuContext(TRIGGER_NAME, props.__scopeNavigationMenu);
  const itemContext = useNavigationMenuItemContext(TRIGGER_NAME, props.__scopeNavigationMenu);
  const ref = React8.useRef(null);
  const composedRefs = useComposedRefs(ref, itemContext.triggerRef, forwardedRef);
  const triggerId = makeTriggerId(context.baseId, itemContext.value);
  const contentId = makeContentId(context.baseId, itemContext.value);
  const hasPointerMoveOpenedRef = React8.useRef(false);
  const wasClickCloseRef = React8.useRef(false);
  const open = itemContext.value === context.value;
  return (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    (0, import_jsx_runtime7.jsx)(Collection.ItemSlot, { scope: __scopeNavigationMenu, value: itemContext.value, children: (0, import_jsx_runtime7.jsx)(FocusGroupItem, { asChild: true, children: (0, import_jsx_runtime7.jsx)(
      Primitive.button,
      {
        id: triggerId,
        disabled,
        "data-disabled": disabled ? "" : void 0,
        "data-state": getOpenState(open),
        "aria-expanded": open,
        "aria-controls": contentId,
        ...triggerProps,
        ref: composedRefs,
        onPointerEnter: composeEventHandlers(props.onPointerEnter, () => {
          wasClickCloseRef.current = false;
          itemContext.wasEscapeCloseRef.current = false;
        }),
        onPointerMove: composeEventHandlers(
          props.onPointerMove,
          whenMouse(() => {
            if (disabled || wasClickCloseRef.current || itemContext.wasEscapeCloseRef.current || hasPointerMoveOpenedRef.current)
              return;
            context.onTriggerEnter(itemContext.value);
            hasPointerMoveOpenedRef.current = true;
          })
        ),
        onPointerLeave: composeEventHandlers(
          props.onPointerLeave,
          whenMouse(() => {
            if (disabled) return;
            context.onTriggerLeave();
            hasPointerMoveOpenedRef.current = false;
          })
        ),
        onClick: composeEventHandlers(props.onClick, () => {
          context.onItemSelect(itemContext.value);
          wasClickCloseRef.current = open;
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          const verticalEntryKey = context.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
          const entryKey = { horizontal: "ArrowDown", vertical: verticalEntryKey }[context.orientation];
          if (open && event.key === entryKey) {
            itemContext.onEntryKeyDown();
            event.preventDefault();
          }
        })
      }
    ) }) }),
    open && (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      (0, import_jsx_runtime7.jsx)(
        Root,
        {
          "aria-hidden": true,
          tabIndex: 0,
          ref: itemContext.focusProxyRef,
          onFocus: (event) => {
            const content = itemContext.contentRef.current;
            const prevFocusedElement = event.relatedTarget;
            const wasTriggerFocused = prevFocusedElement === ref.current;
            const wasFocusFromContent = content?.contains(prevFocusedElement);
            if (wasTriggerFocused || !wasFocusFromContent) {
              itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
            }
          }
        }
      ),
      context.viewport && (0, import_jsx_runtime7.jsx)("span", { "aria-owns": contentId })
    ] })
  ] });
});
NavigationMenuTrigger.displayName = TRIGGER_NAME;
var LINK_NAME = "NavigationMenuLink";
var LINK_SELECT = "navigationMenu.linkSelect";
var NavigationMenuLink = React8.forwardRef(
  (props, forwardedRef) => {
    const { __scopeNavigationMenu, active, onSelect, ...linkProps } = props;
    return (0, import_jsx_runtime7.jsx)(FocusGroupItem, { asChild: true, children: (0, import_jsx_runtime7.jsx)(
      Primitive.a,
      {
        "data-active": active ? "" : void 0,
        "aria-current": active ? "page" : void 0,
        ...linkProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(
          props.onClick,
          (event) => {
            const target = event.target;
            const linkSelectEvent = new CustomEvent(LINK_SELECT, {
              bubbles: true,
              cancelable: true
            });
            target.addEventListener(LINK_SELECT, (event2) => onSelect?.(event2), { once: true });
            dispatchDiscreteCustomEvent(target, linkSelectEvent);
            if (!linkSelectEvent.defaultPrevented && !event.metaKey) {
              const rootContentDismissEvent = new CustomEvent(ROOT_CONTENT_DISMISS, {
                bubbles: true,
                cancelable: true
              });
              dispatchDiscreteCustomEvent(target, rootContentDismissEvent);
            }
          },
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
NavigationMenuLink.displayName = LINK_NAME;
var INDICATOR_NAME = "NavigationMenuIndicator";
var NavigationMenuIndicator = React8.forwardRef((props, forwardedRef) => {
  const { forceMount, ...indicatorProps } = props;
  const context = useNavigationMenuContext(INDICATOR_NAME, props.__scopeNavigationMenu);
  const isVisible = Boolean(context.value);
  return context.indicatorTrack ? import_react_dom.default.createPortal(
    (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || isVisible, children: (0, import_jsx_runtime7.jsx)(NavigationMenuIndicatorImpl, { ...indicatorProps, ref: forwardedRef }) }),
    context.indicatorTrack
  ) : null;
});
NavigationMenuIndicator.displayName = INDICATOR_NAME;
var NavigationMenuIndicatorImpl = React8.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, ...indicatorProps } = props;
  const context = useNavigationMenuContext(INDICATOR_NAME, __scopeNavigationMenu);
  const getItems = useCollection(__scopeNavigationMenu);
  const [activeTrigger, setActiveTrigger] = React8.useState(
    null
  );
  const [position, setPosition] = React8.useState(null);
  const isHorizontal = context.orientation === "horizontal";
  const isVisible = Boolean(context.value);
  React8.useEffect(() => {
    const items = getItems();
    const triggerNode = items.find((item) => item.value === context.value)?.ref.current;
    if (triggerNode) setActiveTrigger(triggerNode);
  }, [getItems, context.value]);
  const handlePositionChange = () => {
    if (activeTrigger) {
      setPosition({
        size: isHorizontal ? activeTrigger.offsetWidth : activeTrigger.offsetHeight,
        offset: isHorizontal ? activeTrigger.offsetLeft : activeTrigger.offsetTop
      });
    }
  };
  useResizeObserver(activeTrigger, handlePositionChange);
  useResizeObserver(context.indicatorTrack, handlePositionChange);
  return position ? (0, import_jsx_runtime7.jsx)(
    Primitive.div,
    {
      "aria-hidden": true,
      "data-state": isVisible ? "visible" : "hidden",
      "data-orientation": context.orientation,
      ...indicatorProps,
      ref: forwardedRef,
      style: {
        position: "absolute",
        ...isHorizontal ? {
          left: 0,
          width: position.size + "px",
          transform: `translateX(${position.offset}px)`
        } : {
          top: 0,
          height: position.size + "px",
          transform: `translateY(${position.offset}px)`
        },
        ...indicatorProps.style
      }
    }
  ) : null;
});
var CONTENT_NAME = "NavigationMenuContent";
var NavigationMenuContent = React8.forwardRef((props, forwardedRef) => {
  const { forceMount, ...contentProps } = props;
  const context = useNavigationMenuContext(CONTENT_NAME, props.__scopeNavigationMenu);
  const itemContext = useNavigationMenuItemContext(CONTENT_NAME, props.__scopeNavigationMenu);
  const composedRefs = useComposedRefs(itemContext.contentRef, forwardedRef);
  const open = itemContext.value === context.value;
  const commonProps = {
    value: itemContext.value,
    triggerRef: itemContext.triggerRef,
    focusProxyRef: itemContext.focusProxyRef,
    wasEscapeCloseRef: itemContext.wasEscapeCloseRef,
    onContentFocusOutside: itemContext.onContentFocusOutside,
    onRootContentClose: itemContext.onRootContentClose,
    ...contentProps
  };
  return !context.viewport ? (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || open, children: (0, import_jsx_runtime7.jsx)(
    NavigationMenuContentImpl,
    {
      "data-state": getOpenState(open),
      ...commonProps,
      ref: composedRefs,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, context.onContentEnter),
      onPointerLeave: composeEventHandlers(
        props.onPointerLeave,
        whenMouse(context.onContentLeave)
      ),
      style: {
        // Prevent interaction when animating out
        pointerEvents: !open && context.isRootMenu ? "none" : void 0,
        ...commonProps.style
      }
    }
  ) }) : (0, import_jsx_runtime7.jsx)(ViewportContentMounter, { forceMount, ...commonProps, ref: composedRefs });
});
NavigationMenuContent.displayName = CONTENT_NAME;
var ViewportContentMounter = React8.forwardRef((props, forwardedRef) => {
  const context = useNavigationMenuContext(CONTENT_NAME, props.__scopeNavigationMenu);
  const { onViewportContentChange, onViewportContentRemove } = context;
  useLayoutEffect2(() => {
    onViewportContentChange(props.value, {
      ref: forwardedRef,
      ...props
    });
  }, [props, forwardedRef, onViewportContentChange]);
  useLayoutEffect2(() => {
    return () => onViewportContentRemove(props.value);
  }, [props.value, onViewportContentRemove]);
  return null;
});
var ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss";
var NavigationMenuContentImpl = React8.forwardRef((props, forwardedRef) => {
  const {
    __scopeNavigationMenu,
    value,
    triggerRef,
    focusProxyRef,
    wasEscapeCloseRef,
    onRootContentClose,
    onContentFocusOutside,
    ...contentProps
  } = props;
  const context = useNavigationMenuContext(CONTENT_NAME, __scopeNavigationMenu);
  const ref = React8.useRef(null);
  const composedRefs = useComposedRefs(ref, forwardedRef);
  const triggerId = makeTriggerId(context.baseId, value);
  const contentId = makeContentId(context.baseId, value);
  const getItems = useCollection(__scopeNavigationMenu);
  const prevMotionAttributeRef = React8.useRef(null);
  const { onItemDismiss } = context;
  React8.useEffect(() => {
    const content = ref.current;
    if (context.isRootMenu && content) {
      const handleClose = () => {
        onItemDismiss();
        onRootContentClose();
        if (content.contains(document.activeElement)) triggerRef.current?.focus();
      };
      content.addEventListener(ROOT_CONTENT_DISMISS, handleClose);
      return () => content.removeEventListener(ROOT_CONTENT_DISMISS, handleClose);
    }
  }, [context.isRootMenu, props.value, triggerRef, onItemDismiss, onRootContentClose]);
  const motionAttribute = React8.useMemo(() => {
    const items = getItems();
    const values = items.map((item) => item.value);
    if (context.dir === "rtl") values.reverse();
    const index = values.indexOf(context.value);
    const prevIndex = values.indexOf(context.previousValue);
    const isSelected = value === context.value;
    const wasSelected = prevIndex === values.indexOf(value);
    if (!isSelected && !wasSelected) return prevMotionAttributeRef.current;
    const attribute = (() => {
      if (index !== prevIndex) {
        if (isSelected && prevIndex !== -1) return index > prevIndex ? "from-end" : "from-start";
        if (wasSelected && index !== -1) return index > prevIndex ? "to-start" : "to-end";
      }
      return null;
    })();
    prevMotionAttributeRef.current = attribute;
    return attribute;
  }, [context.previousValue, context.value, context.dir, getItems, value]);
  return (0, import_jsx_runtime7.jsx)(FocusGroup, { asChild: true, children: (0, import_jsx_runtime7.jsx)(
    DismissableLayer,
    {
      id: contentId,
      "aria-labelledby": triggerId,
      "data-motion": motionAttribute,
      "data-orientation": context.orientation,
      ...contentProps,
      ref: composedRefs,
      disableOutsidePointerEvents: false,
      onDismiss: () => {
        const rootContentDismissEvent = new Event(ROOT_CONTENT_DISMISS, {
          bubbles: true,
          cancelable: true
        });
        ref.current?.dispatchEvent(rootContentDismissEvent);
      },
      onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
        onContentFocusOutside();
        const target = event.target;
        if (context.rootNavigationMenu?.contains(target)) event.preventDefault();
      }),
      onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
        const target = event.target;
        const isTrigger = getItems().some((item) => item.ref.current?.contains(target));
        const isRootViewport = context.isRootMenu && context.viewport?.contains(target);
        if (isTrigger || isRootViewport || !context.isRootMenu) event.preventDefault();
      }),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
        const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
        const isTabKey = event.key === "Tab" && !isMetaKey;
        if (isTabKey) {
          const candidates = getTabbableCandidates(event.currentTarget);
          const focusedElement = document.activeElement;
          const index = candidates.findIndex((candidate) => candidate === focusedElement);
          const isMovingBackwards = event.shiftKey;
          const nextCandidates = isMovingBackwards ? candidates.slice(0, index).reverse() : candidates.slice(index + 1, candidates.length);
          if (focusFirst(nextCandidates)) {
            event.preventDefault();
          } else {
            focusProxyRef.current?.focus();
          }
        }
      }),
      onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (_event) => {
        wasEscapeCloseRef.current = true;
      })
    }
  ) });
});
var VIEWPORT_NAME = "NavigationMenuViewport";
var NavigationMenuViewport = React8.forwardRef((props, forwardedRef) => {
  const { forceMount, ...viewportProps } = props;
  const context = useNavigationMenuContext(VIEWPORT_NAME, props.__scopeNavigationMenu);
  const open = Boolean(context.value);
  return (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || open, children: (0, import_jsx_runtime7.jsx)(NavigationMenuViewportImpl, { ...viewportProps, ref: forwardedRef }) });
});
NavigationMenuViewport.displayName = VIEWPORT_NAME;
var NavigationMenuViewportImpl = React8.forwardRef((props, forwardedRef) => {
  const { __scopeNavigationMenu, children, ...viewportImplProps } = props;
  const context = useNavigationMenuContext(VIEWPORT_NAME, __scopeNavigationMenu);
  const composedRefs = useComposedRefs(forwardedRef, context.onViewportChange);
  const viewportContentContext = useViewportContentContext(
    CONTENT_NAME,
    props.__scopeNavigationMenu
  );
  const [size, setSize] = React8.useState(null);
  const [content, setContent] = React8.useState(null);
  const viewportWidth = size ? size?.width + "px" : void 0;
  const viewportHeight = size ? size?.height + "px" : void 0;
  const open = Boolean(context.value);
  const activeContentValue = open ? context.value : context.previousValue;
  const handleSizeChange = () => {
    if (content) setSize({ width: content.offsetWidth, height: content.offsetHeight });
  };
  useResizeObserver(content, handleSizeChange);
  return (0, import_jsx_runtime7.jsx)(
    Primitive.div,
    {
      "data-state": getOpenState(open),
      "data-orientation": context.orientation,
      ...viewportImplProps,
      ref: composedRefs,
      style: {
        // Prevent interaction when animating out
        pointerEvents: !open && context.isRootMenu ? "none" : void 0,
        ["--radix-navigation-menu-viewport-width"]: viewportWidth,
        ["--radix-navigation-menu-viewport-height"]: viewportHeight,
        ...viewportImplProps.style
      },
      onPointerEnter: composeEventHandlers(props.onPointerEnter, context.onContentEnter),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse(context.onContentLeave)),
      children: Array.from(viewportContentContext.items).map(([value, { ref, forceMount, ...props2 }]) => {
        const isActive = activeContentValue === value;
        return (0, import_jsx_runtime7.jsx)(Presence, { present: forceMount || isActive, children: (0, import_jsx_runtime7.jsx)(
          NavigationMenuContentImpl,
          {
            ...props2,
            ref: composeRefs(ref, (node) => {
              if (isActive && node) setContent(node);
            })
          }
        ) }, value);
      })
    }
  );
});
var FOCUS_GROUP_NAME = "FocusGroup";
var FocusGroup = React8.forwardRef(
  (props, forwardedRef) => {
    const { __scopeNavigationMenu, ...groupProps } = props;
    const context = useNavigationMenuContext(FOCUS_GROUP_NAME, __scopeNavigationMenu);
    return (0, import_jsx_runtime7.jsx)(FocusGroupCollection.Provider, { scope: __scopeNavigationMenu, children: (0, import_jsx_runtime7.jsx)(FocusGroupCollection.Slot, { scope: __scopeNavigationMenu, children: (0, import_jsx_runtime7.jsx)(Primitive.div, { dir: context.dir, ...groupProps, ref: forwardedRef }) }) });
  }
);
var ARROW_KEYS = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
var FOCUS_GROUP_ITEM_NAME = "FocusGroupItem";
var FocusGroupItem = React8.forwardRef(
  (props, forwardedRef) => {
    const { __scopeNavigationMenu, ...groupProps } = props;
    const getItems = useFocusGroupCollection(__scopeNavigationMenu);
    const context = useNavigationMenuContext(FOCUS_GROUP_ITEM_NAME, __scopeNavigationMenu);
    return (0, import_jsx_runtime7.jsx)(FocusGroupCollection.ItemSlot, { scope: __scopeNavigationMenu, children: (0, import_jsx_runtime7.jsx)(
      Primitive.button,
      {
        ...groupProps,
        ref: forwardedRef,
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          const isFocusNavigationKey = ["Home", "End", ...ARROW_KEYS].includes(event.key);
          if (isFocusNavigationKey) {
            let candidateNodes = getItems().map((item) => item.ref.current);
            const prevItemKey = context.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
            const prevKeys = [prevItemKey, "ArrowUp", "End"];
            if (prevKeys.includes(event.key)) candidateNodes.reverse();
            if (ARROW_KEYS.includes(event.key)) {
              const currentIndex = candidateNodes.indexOf(event.currentTarget);
              candidateNodes = candidateNodes.slice(currentIndex + 1);
            }
            setTimeout(() => focusFirst(candidateNodes));
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function focusFirst(candidates) {
  const previouslyFocusedElement = document.activeElement;
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement) return true;
    candidate.focus();
    return document.activeElement !== previouslyFocusedElement;
  });
}
function removeFromTabOrder(candidates) {
  candidates.forEach((candidate) => {
    candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
    candidate.setAttribute("tabindex", "-1");
  });
  return () => {
    candidates.forEach((candidate) => {
      const prevTabIndex = candidate.dataset.tabindex;
      candidate.setAttribute("tabindex", prevTabIndex);
    });
  };
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
function getOpenState(open) {
  return open ? "open" : "closed";
}
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var Root2 = NavigationMenu;
var Sub = NavigationMenuSub;
var List = NavigationMenuList;
var Item = NavigationMenuItem;
var Trigger = NavigationMenuTrigger;
var Link = NavigationMenuLink;
var Indicator = NavigationMenuIndicator;
var Content = NavigationMenuContent;
var Viewport = NavigationMenuViewport;
export {
  Content,
  Indicator,
  Item,
  Link,
  List,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuSub,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  Root2 as Root,
  Sub,
  Trigger,
  Viewport,
  createNavigationMenuScope
};
//# sourceMappingURL=@radix-ui_react-navigation-menu.js.map
