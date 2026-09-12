// Comprehensive Assessment Question Bank
// Every test domain features 10-15 real-world questions with code snippets & explanations.

export const QUESTION_BANK = {
  'React': [
    {
      id: 'react-1',
      category: 'React',
      question: 'What will be rendered on the screen after clicking the button once in this React component?',
      codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`,
      options: ['Count: 3', 'Count: 1', 'Count: 0', 'Count: 2'],
      correctAnswerIndex: 1,
      explanation: 'React batches state updates. In a single render closure, `count` remains 0, so `setCount(0 + 1)` is called three times with the same value 1.'
    },
    {
      id: 'react-2',
      category: 'React',
      question: 'Which Hook should be used for imperative side-effects like fetching data, DOM mutations, or subscriptions?',
      codeSnippet: `useEffect(() => {
  const sub = api.subscribe();
  return () => sub.unsubscribe();
}, [api]);`,
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswerIndex: 1,
      explanation: 'useEffect handles side-effects after DOM updates and provides a cleanup function on unmount or dependency change.'
    },
    {
      id: 'react-3',
      category: 'React',
      question: 'What is the purpose of the key prop when rendering lists in React?',
      codeSnippet: `const list = items.map((item) => <ListItem key={item.id} data={item} />);`,
      options: [
        'To style list elements automatically with CSS flexbox',
        'To help React reconciliation identify which items have changed, added, or removed',
        'To bind click event listeners to child items',
        'To encrypt child item props before sending to server'
      ],
      correctAnswerIndex: 1,
      explanation: 'Keys give elements a stable identity so React diffing algorithm can reuse DOM nodes efficiently.'
    },
    {
      id: 'react-4',
      category: 'React',
      question: 'How do you pass a ref to a child functional component in modern React?',
      codeSnippet: `const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} className="input-field" {...props} />
));`,
      options: [
        'Pass ref as a standard prop without any wrapper',
        'Use React.forwardRef higher-order component wrapper',
        'Ref can only be passed to class components',
        'Use the useImperativeHandle hook directly in parent'
      ],
      correctAnswerIndex: 1,
      explanation: 'React.forwardRef allows a component to receive a ref and pass it down to a child DOM node.'
    },
    {
      id: 'react-5',
      category: 'React',
      question: 'What is the primary function of React.memo?',
      codeSnippet: `const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.title}</div>;
});`,
      options: [
        'Cache network requests in local storage',
        'Prevent unnecessary component re-renders when props have not changed',
        'Manage global application Redux store state',
        'Automatically sanitize HTML strings to prevent XSS'
      ],
      correctAnswerIndex: 1,
      explanation: 'React.memo skips re-rendering a component if its props perform a shallow equal comparison.'
    },
    {
      id: 'react-6',
      category: 'React',
      question: 'What is the correct output when updating state based on previous state using updater function?',
      codeSnippet: `const [count, setCount] = useState(0);
const increment = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};`,
      options: ['Count increments by 1', 'Count increments by 2', 'Count remains 0', 'Throws Runtime TypeError'],
      correctAnswerIndex: 1,
      explanation: 'Passing a function to `setCount(prev => prev + 1)` queues the updater functions in order, accumulating state changes.'
    },
    {
      id: 'react-7',
      category: 'React',
      question: 'Which Hook returns a memoized callback function that only changes when one of its dependencies changes?',
      codeSnippet: `const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`,
      options: ['useMemo', 'useCallback', 'useRef', 'useLayoutEffect'],
      correctAnswerIndex: 1,
      explanation: 'useCallback(fn, deps) is equivalent to useMemo(() => fn, deps), caching function instances across renders.'
    },
    {
      id: 'react-8',
      category: 'React',
      question: 'What happens when you call useLayoutEffect instead of useEffect?',
      options: [
        'Fires asynchronously after browser layout and paint',
        'Fires synchronously after all DOM mutations but before the browser paints',
        'Executes on the server during SSR only',
        'Automatically wraps state updates in React.startTransition'
      ],
      correctAnswerIndex: 1,
      explanation: 'useLayoutEffect runs synchronously before paint, ideal for measuring DOM layout before visual rendering.'
    },
    {
      id: 'react-9',
      category: 'React',
      question: 'How do you access Context value in a functional component?',
      codeSnippet: `const ThemeContext = createContext('dark');
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}`,
      options: ['useContext(ThemeContext)', 'useStore(ThemeContext)', 'Context.Consumer() only', 'getInitialProps()'],
      correctAnswerIndex: 0,
      explanation: 'useContext accepts a context object created by createContext and returns the current context value.'
    },
    {
      id: 'react-10',
      category: 'React',
      question: 'What is the purpose of useReducer over useState?',
      options: [
        'To speed up CSS animations',
        'To manage complex state logic with multiple sub-values or predictable action transitions',
        'To bypass component re-rendering entirely',
        'To replace Redux store without provider'
      ],
      correctAnswerIndex: 1,
      explanation: 'useReducer is preferred for complex state objects or when next state depends on previous state via actions.'
    },
    {
      id: 'react-11',
      category: 'React',
      question: 'What is the main benefit of React 18 Concurrent Rendering?',
      options: [
        'Renders HTML strictly on backend Node server',
        'Allows React to interrupt, pause, or resume rendering work to keep the UI responsive',
        'Replaces virtual DOM with direct Shadow DOM pointers',
        'Removes requirement of key props in list rendering'
      ],
      correctAnswerIndex: 1,
      explanation: 'Concurrent React can pause heavy render updates (like filtering a list) to immediately handle user typing or clicks.'
    },
    {
      id: 'react-12',
      category: 'React',
      question: 'What does strict mode (React.StrictMode) do during development?',
      options: [
        'Enforces strict TypeScript type checking at compile time',
        'Intentionally double-invokes component renders and effects to catch side-effect bugs',
        'Blocks all network fetch requests to local endpoints',
        'Prevents inline CSS styles from rendering'
      ],
      correctAnswerIndex: 1,
      explanation: 'StrictMode double-invokes functions and effects in dev mode to help identify unsafe side effects and legacy APIs.'
    }
  ],

  'JavaScript': [
    {
      id: 'js-1',
      category: 'JavaScript',
      question: 'What will be printed to the console when executing this code?',
      codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
      options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '4, 1, 3, 2'],
      correctAnswerIndex: 1,
      explanation: 'Synchronous code runs first (1, 4). Microtasks (Promise.then -> 3) execute before Macrotasks (setTimeout -> 2).'
    },
    {
      id: 'js-2',
      category: 'JavaScript',
      question: 'What is the output of the following JavaScript snippet?',
      codeSnippet: `const obj = {
  name: 'Academia',
  getName: function() {
    return this.name;
  },
  getArrowName: () => {
    return this.name;
  }
};
console.log(obj.getName(), obj.getArrowName());`,
      options: [
        'Academia, undefined',
        'Academia, Academia',
        'undefined, Academia',
        'TypeError: obj.getName is not a function'
      ],
      correctAnswerIndex: 0,
      explanation: 'Standard functions bind `this` to the calling object (`obj`). Arrow functions capture `this` from outer lexical scope (window/global).'
    },
    {
      id: 'js-3',
      category: 'JavaScript',
      question: 'Which statement accurately describes JavaScript Closures?',
      codeSnippet: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}`,
      options: [
        'Functions retain access to their outer lexical environment even after parent function execution completes',
        'Closures are created only when using ES6 class instances',
        'Closures block the single-threaded event loop execution',
        'Variables inside closures are accessible globally via window object'
      ],
      correctAnswerIndex: 0,
      explanation: 'A closure is the combination of a function bundled together with references to its surrounding state.'
    },
    {
      id: 'js-4',
      category: 'JavaScript',
      question: 'What is the result of typeof NaN and NaN === NaN?',
      codeSnippet: `console.log(typeof NaN);
console.log(NaN === NaN);`,
      options: ['"number", false', '"number", true', '"nan", false', '"undefined", false'],
      correctAnswerIndex: 0,
      explanation: '`typeof NaN` is "number". In IEEE 754 floating point standard, NaN is not equal to anything, including itself (`NaN === NaN` is false).'
    },
    {
      id: 'js-5',
      category: 'JavaScript',
      question: 'What does Promise.allSettled() do compared to Promise.all()?',
      options: [
        'Rejects immediately if any input promise rejects',
        'Waits for all promises to settle (either fulfilled or rejected) and returns an array of outcome objects',
        'Cancels running network requests automatically',
        'Executes promises sequentially instead of in parallel'
      ],
      correctAnswerIndex: 1,
      explanation: 'Promise.allSettled() never short-circuits on rejection; it returns status and value/reason for every promise.'
    },
    {
      id: 'js-6',
      category: 'JavaScript',
      question: 'What will be logged to the console in this loop?',
      codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
      options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'],
      correctAnswerIndex: 1,
      explanation: '`var` is function-scoped. By the time timeouts execute, the single shared `i` variable has incremented to 3. Using `let` creates block scope.'
    },
    {
      id: 'js-7',
      category: 'JavaScript',
      question: 'How does the JavaScript prototype chain work when looking up a property?',
      codeSnippet: `const parent = { surname: 'Doe' };
const child = Object.create(parent);
console.log(child.surname);`,
      options: [
        'Searches child object; if not found, traverses up [[Prototype]] chain until null',
        'Searches child object only; throws ReferenceError if missing',
        'Copies all properties from parent into child memory space on creation',
        'Traverses child properties in alphabetical order'
      ],
      correctAnswerIndex: 0,
      explanation: 'If a property is not on the object itself, JS searches its prototype recursively until reaching `Object.prototype.__proto__` (null).'
    },
    {
      id: 'js-8',
      category: 'JavaScript',
      question: 'What is the output of this optional chaining and nullish coalescing expression?',
      codeSnippet: `const user = { settings: { theme: 0 } };
const theme = user?.settings?.theme ?? 'default';
const mode = user?.settings?.theme || 'default';
console.log(theme, mode);`,
      options: ['0, "default"', '"default", "default"', '0, 0', 'null, "default"'],
      correctAnswerIndex: 0,
      explanation: '`??` checks specifically for null or undefined (so 0 is kept). `||` checks for falsy values (0 is falsy, so it falls back to "default").'
    },
    {
      id: 'js-9',
      category: 'JavaScript',
      question: 'In TypeScript, what is the difference between `unknown` and `any`?',
      codeSnippet: `let a: any = 'hello';
let b: unknown = 'hello';
a.toUpperCase(); // Allowed
// b.toUpperCase(); // Error!`,
      options: [
        '`unknown` is type-safe; you must perform type checking/narrowing before operating on it, whereas `any` disables all type checks',
        '`any` is type-safe while `unknown` allows anything',
        'They are identical aliases for un-typed values',
        '`unknown` can only be assigned numbers'
      ],
      correctAnswerIndex: 0,
      explanation: '`unknown` forces developer to verify or narrow the type before calling methods or accessing properties.'
    },
    {
      id: 'js-10',
      category: 'JavaScript',
      question: 'What does Function.prototype.bind() return?',
      codeSnippet: `const boundFn = fn.bind(ctx, arg1);`,
      options: [
        'Executes fn immediately and returns the result',
        'Returns a new copy of the function with specified `this` context and initial arguments bound',
        'Returns a Promise resolving to fn return value',
        'Returns boolean indicating success'
      ],
      correctAnswerIndex: 1,
      explanation: 'bind() creates a new function instance with a fixed `this` value and optional pre-filled lead arguments.'
    },
    {
      id: 'js-11',
      category: 'JavaScript',
      question: 'What will `[1, 2, 3] + [4, 5, 6]` evaluate to in JavaScript?',
      codeSnippet: `console.log([1, 2, 3] + [4, 5, 6]);`,
      options: ['[1, 2, 3, 4, 5, 6]', '"1,2,34,5,6"', 'NaN', 'TypeError: cannot concatenate arrays'],
      correctAnswerIndex: 1,
      explanation: 'Arrays are converted to string primitives ("1,2,3" and "4,5,6") and concatenated into "1,2,34,5,6".'
    },
    {
      id: 'js-12',
      category: 'JavaScript',
      question: 'What is the purpose of WeakMap in JavaScript?',
      options: [
        'Stores keys that are garbage collected if no other references to the key objects exist',
        'Stores keys with weak data encryption',
        'Allows string keys only',
        'Provides sorting for Map entries automatically'
      ],
      correctAnswerIndex: 0,
      explanation: 'WeakMap key references are held weakly, preventing memory leaks when key objects are no longer referenced elsewhere.'
    }
  ],

  'Python': [
    {
      id: 'py-1',
      category: 'Python',
      question: 'What will be the output of this Python code snippet?',
      codeSnippet: `def func(val, lst=[]):
    lst.append(val)
    return lst

print(func(1))
print(func(2))`,
      options: ['[1] then [2]', '[1] then [1, 2]', '[1, 2] then [1, 2]', 'TypeError'],
      correctAnswerIndex: 1,
      explanation: 'Default argument values in Python are evaluated once when the function is defined. Mutable default arguments (`lst=[]`) persist across calls.'
    },
    {
      id: 'py-2',
      category: 'Python',
      question: 'Which keyword yields values lazily from a Python generator function without storing the whole list in memory?',
      codeSnippet: `def generate_stream():
    for i in range(1000000):
        yield i * 2`,
      options: ['return', 'yield', 'await', 'emit'],
      correctAnswerIndex: 1,
      explanation: '`yield` turns a function into a generator iterator, computing values on demand with minimal memory footprint.'
    },
    {
      id: 'py-3',
      category: 'Python',
      question: 'What does CPython Global Interpreter Lock (GIL) enforce?',
      options: [
        'Only one thread executes Python bytecode at a time in a single process',
        'Garbage collection memory limits across network sockets',
        'Automatic type coercion between integers and strings',
        'Multiprocessing lock bounds for shared arrays'
      ],
      correctAnswerIndex: 0,
      explanation: 'GIL is a mutex protecting access to Python objects, preventing multiple native threads from executing CPython bytecodes in parallel.'
    },
    {
      id: 'py-4',
      category: 'Python',
      question: 'What will be the value of `result` in this list comprehension with condition?',
      codeSnippet: `nums = [1, 2, 3, 4, 5, 6]
result = [x**2 for x in nums if x % 2 == 0]
print(result)`,
      options: ['[1, 4, 9, 16, 25, 36]', '[4, 16, 36]', '[2, 4, 6]', '[1, 9, 25]'],
      correctAnswerIndex: 1,
      explanation: 'Filters even numbers [2, 4, 6] and squares them to get [4, 16, 36].'
    },
    {
      id: 'py-5',
      category: 'Python',
      question: 'How does FastAPI perform fast request data validation and serialization?',
      codeSnippet: `from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None`,
      options: [
        'Uses standard Python dataclasses only',
        'Uses Pydantic schemas and Python type hints',
        'Executes raw C++ bindings manually',
        'Parses JSON strings via regular expressions'
      ],
      correctAnswerIndex: 1,
      explanation: 'FastAPI leverages Pydantic and type hints for high-performance schema validation and automatic OpenAPI documentation.'
    },
    {
      id: 'py-6',
      category: 'Python',
      question: 'What does the `@staticmethod` decorator do in Python class definitions?',
      codeSnippet: `class Utility:
    @staticmethod
    def calc(a, b):
        return a + b`,
      options: [
        'Binds `self` automatically as first argument',
        'Binds `cls` automatically as first argument',
        'Defines a method that does not receive an implicit first argument (neither `self` nor `cls`)',
        'Prevents the method from being called outside the class'
      ],
      correctAnswerIndex: 2,
      explanation: 'Static methods do not take implicit `self` or `cls` parameters; they act like plain functions inside a class namespace.'
    },
    {
      id: 'py-7',
      category: 'Python',
      question: 'What is the output of dictionary comprehension and merging using `**` operator?',
      codeSnippet: `d1 = {'a': 1, 'b': 2}
d2 = {'b': 3, 'c': 4}
d3 = {**d1, **d2}
print(d3['b'])`,
      options: ['2', '3', '5', 'KeyError'],
      correctAnswerIndex: 1,
      explanation: 'Unpacking `{**d1, **d2}` overwrites duplicate keys with values from the rightmost dictionary (`d2["b"] = 3`).'
    },
    {
      id: 'py-8',
      category: 'Python',
      question: 'What is the difference between `is` and `==` in Python?',
      codeSnippet: `a = [1, 2]
b = [1, 2]
print(a == b, a is b)`,
      options: ['True True', 'True False', 'False True', 'False False'],
      correctAnswerIndex: 1,
      explanation: '`==` checks value equality (`a` and `b` have identical elements). `is` checks identity (referential equality in memory address).'
    },
    {
      id: 'py-9',
      category: 'Python',
      question: 'What does `asyncio.gather(*tasks)` do in Python?',
      codeSnippet: `import asyncio

async def main():
    res = await asyncio.gather(fetch_a(), fetch_b())`,
      options: [
        'Runs coroutines concurrently on the event loop and returns aggregated results list',
        'Spawns multiple OS threads for CPU-heavy computation',
        'Executes tasks sequentially one after another',
        'Terminates event loop on first error'
      ],
      correctAnswerIndex: 0,
      explanation: 'asyncio.gather schedules multiple awaitable objects concurrently on the single-threaded event loop.'
    },
    {
      id: 'py-10',
      category: 'Python',
      question: 'What is the purpose of `*args` and `**kwargs` in Python function signatures?',
      options: [
        'Pointers to memory addresses in C extensions',
        '`*args` passes variable positional arguments as tuple; `**kwargs` passes variable keyword arguments as dict',
        'Keyword filters for database queries only',
        'Required annotations for async functions'
      ],
      correctAnswerIndex: 1,
      explanation: '`*args` collects arbitrary positional parameters into a tuple, while `**kwargs` collects arbitrary keyword parameters into a dictionary.'
    },
    {
      id: 'py-11',
      category: 'Python',
      question: 'What is a Python Context Manager and what statement utilizes it?',
      codeSnippet: `with open('file.txt', 'w') as f:
    f.write('Hello')`,
      options: [
        '`try/except` block for error catching',
        '`with` statement; automatically handles setup (`__enter__`) and resource cleanup (`__exit__`)',
        '`for` loop over iterators',
        '`import` statement for module loading'
      ],
      correctAnswerIndex: 1,
      explanation: 'Context managers ensure resources (like file handles or DB locks) are properly freed even if exceptions occur.'
    },
    {
      id: 'py-12',
      category: 'Python',
      question: 'What is the output of `functools.lru_cache` when wrapping a recursive memoized function?',
      codeSnippet: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)`,
      options: [
        'Caches return values based on input arguments, turning O(2^N) recursion into O(N)',
        'Clears system RAM when cache is full',
        'Converts function to multi-threaded worker',
        'Prevents recursive depth limits'
      ],
      correctAnswerIndex: 0,
      explanation: 'lru_cache (Least Recently Used) memoizes function calls so repeated inputs return cached results in O(1) time.'
    }
  ],

  'C++': [
    {
      id: 'cpp-1',
      category: 'C++',
      question: 'What is the output of the following C++ code snippet?',
      codeSnippet: `#include <iostream>
using namespace std;

void update(int* ptr) {
  *ptr = 20;
}

int main() {
  int x = 10;
  update(&x);
  cout << x;
  return 0;
}`,
      options: ['10', '20', '0', 'Compilation Error'],
      correctAnswerIndex: 1,
      explanation: 'Passing address `&x` to pointer `ptr` allows `update` function to dereference `*ptr` and modify original variable `x`.'
    },
    {
      id: 'cpp-2',
      category: 'C++',
      question: 'What is the primary benefit of using `std::unique_ptr` in C++11?',
      codeSnippet: `std::unique_ptr<Widget> w = std::make_unique<Widget>();`,
      options: [
        'Ensures strict single ownership of dynamically allocated heap memory with automatic deallocation on scope exit',
        'Allows multiple shared pointers to reference the same heap object',
        'Implements garbage collection cycles automatically',
        'Increases stack allocation speed'
      ],
      correctAnswerIndex: 0,
      explanation: 'std::unique_ptr enforces RAII with exclusive ownership and cannot be copied (only moved).'
    },
    {
      id: 'cpp-3',
      category: 'C++',
      question: 'What happens when a base class destructor is NOT declared as `virtual` when deleting derived objects via base pointers?',
      codeSnippet: `class Base { public: ~Base() {} };
class Derived : public Base { int* data = new int[100]; };
Base* b = new Derived();
delete b; // Bug?`,
      options: [
        'Undefined behavior occurs; Derived destructor will not be called, causing memory leaks',
        'Derived destructor is automatically called by compiler',
        'Throws a runtime std::bad_alloc exception',
        'Compiles into pure virtual call error'
      ],
      correctAnswerIndex: 0,
      explanation: 'Polymorphic base classes MUST have virtual destructors to ensure proper destruction of derived class instances.'
    },
    {
      id: 'cpp-4',
      category: 'C++',
      question: 'What is RAII (Resource Acquisition Is Initialization) in C++?',
      options: [
        'A memory management idiom where resource lifecycle is tied to object scope lifetime',
        'A compiler flag that enables hardware acceleration',
        'A pattern for initializing global variables before main()',
        'A runtime garbage collection module'
      ],
      correctAnswerIndex: 0,
      explanation: 'RAII holds resources in objects so destructor automatically releases resources (file handles, memory, locks) upon exiting scope.'
    },
    {
      id: 'cpp-5',
      category: 'C++',
      question: 'What is the difference between `std::vector::reserve()` and `std::vector::resize()`?',
      codeSnippet: `std::vector<int> v;
v.reserve(10); // A
v.resize(10);  // B`,
      options: [
        'reserve() allocates capacity without changing vector size; resize() changes vector size and default-initializes elements',
        'resize() changes capacity only; reserve() modifies element size',
        'They are exact synonyms',
        'reserve() works on stack; resize() works on heap'
      ],
      correctAnswerIndex: 0,
      explanation: 'reserve(n) allocates memory capacity for n items to avoid reallocations. resize(n) changes size() and adds n elements.'
    },
    {
      id: 'cpp-6',
      category: 'C++',
      question: 'What will be printed when executing this C++ reference code?',
      codeSnippet: `int a = 5;
int& ref = a;
ref = 10;
cout << a << " " << ref;`,
      options: ['5 5', '5 10', '10 10', 'Compilation Error'],
      correctAnswerIndex: 2,
      explanation: '`ref` is an alias for variable `a`. Modifying `ref = 10` changes value of `a` to 10.'
    },
    {
      id: 'cpp-7',
      category: 'C++',
      question: 'What does the `override` keyword do when applied to a virtual member function in C++11?',
      codeSnippet: `class Derived : public Base {
  void render() override;
};`,
      options: [
        'Forces compiler to verify that the method actually overrides a virtual method in base class',
        'Makes the method inline',
        'Prevents further overriding in child classes',
        'Executes method in parallel thread'
      ],
      correctAnswerIndex: 0,
      explanation: '`override` instructs compiler to check base class for matching virtual signature, catching typos or signature mismatches.'
    },
    {
      id: 'cpp-8',
      category: 'C++',
      question: 'What is the difference between `std::move` and `std::forward` in C++?',
      options: [
        '`std::move` unconditionally casts its argument to an rvalue reference; `std::forward` conditionally casts based on template argument (perfect forwarding)',
        '`std::move` copies memory; `std::forward` deletes memory',
        '`std::move` is for pointers; `std::forward` is for primitives',
        'No difference; both perform deep object copies'
      ],
      correctAnswerIndex: 0,
      explanation: 'std::move converts lvalue to rvalue to enable move semantics. std::forward preserves value category (lvalue/rvalue) in templates.'
    },
    {
      id: 'cpp-9',
      category: 'C++',
      question: 'What is the time complexity of lookup in `std::map` vs `std::unordered_map`?',
      options: [
        'std::map is O(log N) (Red-Black Tree); std::unordered_map is O(1) average (Hash Table)',
        'Both are O(1)',
        'std::map is O(1); std::unordered_map is O(N)',
        'Both are O(N)'
      ],
      correctAnswerIndex: 0,
      explanation: 'std::map maintains sorted order via balanced search tree O(log N). std::unordered_map uses hash buckets for average O(1) operations.'
    },
    {
      id: 'cpp-10',
      category: 'C++',
      question: 'What is a nullptr in C++11 compared to NULL / 0?',
      options: [
        'std::nullptr_t type-safe literal pointer, eliminating ambiguity in function overloading between int and pointer',
        'An alias for integer -1',
        'A macro for void*',
        'A runtime error exception handler'
      ],
      correctAnswerIndex: 0,
      explanation: '`nullptr` is a distinct keyword of type `std::nullptr_t`, preventing accidental matching with integer overload parameters.'
    },
    {
      id: 'cpp-11',
      category: 'C++',
      question: 'What does the `constexpr` specifier indicate in C++?',
      codeSnippet: `constexpr int square(int x) { return x * x; }`,
      options: [
        'Evaluates the value or function at compile time whenever possible',
        'Makes variable accessible across external DLLs',
        'Restricts variable modification to main thread',
        'Prevents template instantiation'
      ],
      correctAnswerIndex: 0,
      explanation: '`constexpr` guarantees that expressions can be computed during compilation if inputs are known at compile time.'
    },
    {
      id: 'cpp-12',
      category: 'C++',
      question: 'What is the output of `sizeof(char)` in standard C++ specification?',
      options: ['1 byte always', '4 bytes', 'Depends on 32-bit vs 64-bit architecture', '2 bytes'],
      correctAnswerIndex: 0,
      explanation: 'By standard specification in C and C++, `sizeof(char)` is strictly defined to be 1 byte.'
    }
  ],

  'Java': [
    {
      id: 'java-1',
      category: 'Java',
      question: 'Which memory structure in the JVM holds object instances created with the `new` keyword?',
      codeSnippet: `String str = new String("Hello");`,
      options: ['Stack Memory', 'Heap Memory', 'Method Area', 'Program Counter Register'],
      correctAnswerIndex: 1,
      explanation: 'All object instances and arrays in Java are allocated in the JVM Heap Memory, while reference variables reside on the Stack.'
    },
    {
      id: 'java-2',
      category: 'Java',
      question: 'What is the difference between String, StringBuilder, and StringBuffer in Java?',
      options: [
        'String is immutable; StringBuilder is mutable and non-thread-safe; StringBuffer is mutable and synchronized (thread-safe)',
        'StringBuilder is immutable while String is mutable',
        'StringBuffer is deprecated in Java 8+',
        'They are identical aliases for char array representations'
      ],
      correctAnswerIndex: 0,
      explanation: 'String modifications create new objects. StringBuilder provides high-speed local modifications. StringBuffer adds synchronized methods for multi-threading.'
    },
    {
      id: 'java-3',
      category: 'Java',
      question: 'What will be the output of this String comparison in Java?',
      codeSnippet: `String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");
System.out.println((s1 == s2) + " " + (s1 == s3) + " " + s1.equals(s3));`,
      options: [
        'true false true',
        'true true true',
        'false false true',
        'true false false'
      ],
      correctAnswerIndex: 0,
      explanation: '`s1 == s2` is true (string pool reuse). `s1 == s3` is false (new object on heap). `s1.equals(s3)` is true (content comparison).'
    },
    {
      id: 'java-4',
      category: 'Java',
      question: 'What is the purpose of default methods in Java 8 Interfaces?',
      codeSnippet: `public interface Loggable {
  default void log(String msg) {
    System.out.println("LOG: " + msg);
  }
}`,
      options: [
        'Allows interfaces to define method implementations without breaking existing implementing classes',
        'Private methods for package access only',
        'Replaces abstract classes completely',
        'Executes before static initializers'
      ],
      correctAnswerIndex: 0,
      explanation: 'Default methods enable backward compatibility when extending public interfaces with new functionality.'
    },
    {
      id: 'java-5',
      category: 'Java',
      question: 'What does Spring `@Autowired` annotation perform in Spring Framework?',
      options: [
        'Injects dependent bean dependencies automatically by type into target component',
        'Autogenerates database schema tables',
        'Wraps method in REST controller mapping',
        'Encrypts HTTP request body'
      ],
      correctAnswerIndex: 0,
      explanation: '@Autowired enables Spring Dependency Injection container to wire collaborating beans together automatically.'
    },
    {
      id: 'java-6',
      category: 'Java',
      question: 'What is the difference between `final`, `finally`, and `finalize()` in Java?',
      options: [
        '`final` is a modifier (constant/non-overridable); `finally` is a try-catch block for cleanup; `finalize()` is an Object method called before garbage collection',
        'They are identical keywords for error handling',
        '`finally` creates constants',
        '`final` is used for multithreading locks only'
      ],
      correctAnswerIndex: 0,
      explanation: 'final prevents modification/inheritance; finally executes post try-catch; finalize() is GC cleanup method (now deprecated).'
    },
    {
      id: 'java-7',
      category: 'Java',
      question: 'What is the Java Streams API operation `flatMap()` used for?',
      codeSnippet: `List<List<String>> nested = Arrays.asList(
  Arrays.asList("a", "b"), 
  Arrays.asList("c", "d")
);
List<String> flat = nested.stream()
  .flatMap(Collection::stream)
  .collect(Collectors.toList());`,
      options: [
        'Flattens nested stream structures into a single unified stream',
        'Filters null values from list',
        'Sorts stream in descending order',
        'Executes tasks in parallel threads automatically'
      ],
      correctAnswerIndex: 0,
      explanation: 'flatMap maps each element to a stream and flattens the resulting streams into one continuous stream.'
    },
    {
      id: 'java-8',
      category: 'Java',
      question: 'What will happen when starting a Java thread using `run()` instead of `start()`?',
      codeSnippet: `Thread t = new Thread(runnable);
t.run(); // calling run directly`,
      options: [
        'Executes runnable code synchronously in the current calling thread instead of creating a new OS thread',
        'Throws IllegalThreadStateException',
        'Creates a worker thread in thread pool',
        'Executes asynchronously after 100ms'
      ],
      correctAnswerIndex: 0,
      explanation: '`start()` initializes new OS thread context and calls `run()`. Direct `run()` call executes as plain method in existing thread.'
    },
    {
      id: 'java-9',
      category: 'Java',
      question: 'What is the difference between Checked and Unchecked exceptions in Java?',
      options: [
        'Checked exceptions (derived from Exception) must be caught or declared in throws clause; Unchecked exceptions (derived from RuntimeException) do not require compile-time handling',
        'Unchecked exceptions must be declared; checked exceptions are ignored',
        'Checked exceptions only occur in JVM native code',
        'Unchecked exceptions crash the OS kernel'
      ],
      correctAnswerIndex: 0,
      explanation: 'Checked exceptions are verified at compile-time (e.g. IOException). RuntimeException and Error are unchecked.'
    },
    {
      id: 'java-10',
      category: 'Java',
      question: 'What is the Java Memory Model `volatile` keyword used for?',
      options: [
        'Guarantees thread visibility by forcing reads and writes directly to main memory rather than CPU caches',
        'Makes object state immutable',
        'Prevents Garbage Collection on target field',
        'Locks object instance across threads'
      ],
      correctAnswerIndex: 0,
      explanation: '`volatile` ensures changes to a variable are immediately visible to all other threads, avoiding stale CPU register caches.'
    },
    {
      id: 'java-11',
      category: 'Java',
      question: 'What is the time complexity of `HashMap.get(key)` in Java 8+ when hash collisions occur?',
      options: [
        'O(1) average; degrades to O(log N) in worst case (bucket converted from LinkedList to Red-Black Tree)',
        'O(N) always',
        'O(N^2) worst case',
        'O(1) guaranteed strictly'
      ],
      correctAnswerIndex: 0,
      explanation: 'Java 8 optimizes hash collisions by treeifying high-collision buckets into Red-Black balanced trees O(log N) instead of O(N) linked list.'
    },
    {
      id: 'java-12',
      category: 'Java',
      question: 'What does `@Transactional` annotation do in Spring Boot application services?',
      options: [
        'Wraps method execution in a database transaction boundary, committing on success and rolling back on runtime exceptions',
        'Converts Java method to REST endpoint',
        'Caches return value in Redis server',
        'Restricts method access to admin role'
      ],
      correctAnswerIndex: 0,
      explanation: '@Transactional manages Spring database transactions declarative boundary, automatically rolling back on unchecked exceptions.'
    }
  ],

  'SQL Databases': [
    {
      id: 'sql-1',
      category: 'SQL Databases',
      question: 'Which SQL clause filters records AFTER an aggregation GROUP BY clause?',
      codeSnippet: `SELECT department_id, COUNT(*) 
FROM employees 
GROUP BY department_id 
HAVING COUNT(*) > 5;`,
      options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
      correctAnswerIndex: 1,
      explanation: '`WHERE` filters individual rows BEFORE grouping; `HAVING` filters group aggregate calculations AFTER grouping.'
    },
    {
      id: 'sql-2',
      category: 'SQL Databases',
      question: 'What is the primary trade-off of creating a B-Tree Database Index on a table column?',
      options: [
        'Dramatically accelerates SELECT query lookups at the cost of slightly slower INSERT/UPDATE/DELETE write performance and increased storage size',
        'Compresses table data size on disk',
        'Prevents foreign key constraint violations',
        'Automatically encrypts database columns'
      ],
      correctAnswerIndex: 0,
      explanation: 'Indexes speed up reads (O(log N)) but require updating index trees on every write mutation.'
    },
    {
      id: 'sql-3',
      category: 'SQL Databases',
      question: 'What is the difference between INNER JOIN and LEFT JOIN in SQL?',
      codeSnippet: `SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id;`,
      options: [
        'INNER JOIN returns matching rows in both tables; LEFT JOIN returns ALL rows from left table plus matching right table rows (NULL if unmatched)',
        'LEFT JOIN returns matching rows only; INNER JOIN returns all rows',
        'They produce identical results always',
        'LEFT JOIN only works on primary key columns'
      ],
      correctAnswerIndex: 0,
      explanation: 'LEFT JOIN preserves all records from the left dataset, substituting NULLs for missing right dataset values.'
    },
    {
      id: 'sql-4',
      category: 'SQL Databases',
      question: 'What does ACID stand for in relational database management systems (RDBMS)?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Asynchronous, Concurrent, Indexed, Distributed',
        'Array, Column, Index, Directory',
        'Authentication, Cipher, Integrity, Defense'
      ],
      correctAnswerIndex: 0,
      explanation: 'ACID guarantees database transaction reliability: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safety), Durability (persisted).'
    },
    {
      id: 'sql-5',
      category: 'SQL Databases',
      question: 'What will be returned by this SQL query using window function `ROW_NUMBER()`?',
      codeSnippet: `SELECT name, salary, 
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;`,
      options: [
        'Assigns a unique sequential integer to employees within each department, ordered highest salary first',
        'Sums overall total salaries',
        'Removes duplicate salary records',
        'Calculates department average salary'
      ],
      correctAnswerIndex: 0,
      explanation: 'PARTITION BY divides dataset into department windows; ROW_NUMBER() indexes rows 1..N based on salary ordering.'
    },
    {
      id: 'sql-6',
      category: 'SQL Databases',
      question: 'What is Database Normalization (3NF)?',
      options: [
        'Organizing relational database columns and tables to minimize data redundancy and dependency anomalies',
        'Converting relational data into JSON documents',
        'Indexing all text columns automatically',
        'Scaling database across multiple cloud regions'
      ],
      correctAnswerIndex: 0,
      explanation: '3NF eliminates duplicate attribute storage and transitive functional dependencies.'
    },
    {
      id: 'sql-7',
      category: 'SQL Databases',
      question: 'What is the difference between `UNION` and `UNION ALL` in SQL?',
      options: [
        '`UNION` removes duplicate rows from combined result sets; `UNION ALL` preserves all rows including duplicates and is faster',
        '`UNION ALL` removes duplicates; `UNION` keeps duplicates',
        '`UNION` operates on tables; `UNION ALL` operates on views',
        'They are identical aliases'
      ],
      correctAnswerIndex: 0,
      explanation: 'UNION performs distinct sorting to strip duplicate records; UNION ALL concatenates results directly.'
    },
    {
      id: 'sql-8',
      category: 'SQL Databases',
      question: 'What is a SQL Injection vulnerability and how is it prevented in backend code?',
      options: [
        'Malicious SQL commands injected via untrusted input; prevented using Parameterized Prepared Statements',
        'Database buffer overflow; prevented using C++ compilers',
        'Un-indexed query timeout; prevented using index hints',
        'Memory leak in ORM connections; prevented using connection pooling'
      ],
      correctAnswerIndex: 0,
      explanation: 'Prepared statements separate SQL code structure from user data input parameter binding.'
    },
    {
      id: 'sql-9',
      category: 'SQL Databases',
      question: 'What does the SQL `COALESCE(val1, val2, val3)` function return?',
      codeSnippet: `SELECT COALESCE(phone_mobile, phone_home, 'N/A') FROM contacts;`,
      options: [
        'Returns the first non-null argument in the given parameter list',
        'Concatenates all non-null strings into one text string',
        'Returns count of null parameters',
        'Converts null strings to empty spaces'
      ],
      correctAnswerIndex: 0,
      explanation: 'COALESCE evaluates arguments in order and returns first expression that is not NULL.'
    },
    {
      id: 'sql-10',
      category: 'SQL Databases',
      question: 'What is a Foreign Key constraint in SQL?',
      options: [
        'A column or group of columns that enforces a link between data in two tables, ensuring referential integrity',
        'An external API token for database connection',
        'A key used for encrypting database backups',
        'A unique constraint applied to primary key'
      ],
      correctAnswerIndex: 0,
      explanation: 'Foreign keys ensure child table foreign values must match valid existing parent table primary key values.'
    },
    {
      id: 'sql-11',
      category: 'SQL Databases',
      question: 'What is the difference between DELETE, TRUNCATE, and DROP statements in SQL?',
      options: [
        'DELETE removes specific rows (loggable, supports WHERE); TRUNCATE removes all rows quickly (resets identity); DROP deletes entire table structure',
        'TRUNCATE deletes table structure; DROP deletes specific rows',
        'DELETE cannot be rolled back; TRUNCATE can be rolled back',
        'They perform identical table deletion'
      ],
      correctAnswerIndex: 0,
      explanation: 'DELETE is DML row operation; TRUNCATE is DDL table data purge; DROP removes table definition schema completely.'
    },
    {
      id: 'sql-12',
      category: 'SQL Databases',
      question: 'What is database Sharding in high-scale system architecture?',
      options: [
        'Horizontally partitioning data across multiple independent database server nodes by shard key',
        'Creating read replicas of primary database',
        'Backing up database tables to cloud storage',
        'Creating composite indexes on multiple columns'
      ],
      correctAnswerIndex: 0,
      explanation: 'Sharding distributes large dataset rows across multiple database servers to scale write throughput and storage.'
    }
  ],

  'Git & DevOps': [
    {
      id: 'git-1',
      category: 'Git & DevOps',
      question: 'In Git version control, what is the key difference between `git merge` and `git rebase`?',
      options: [
        'Merge creates a 3-way join commit preserving history; Rebase rewrites commits sequentially onto target branch for a linear log',
        'Rebase deletes old branch tags; Merge creates new repositories',
        'Merge can only run locally; Rebase runs on remote GitHub server',
        'They are identical aliases'
      ],
      correctAnswerIndex: 0,
      explanation: 'Rebase reapplies commits on top of another base tip for linear history, while merge preserves exact commit timing nodes.'
    },
    {
      id: 'git-2',
      category: 'Git & DevOps',
      question: 'What command temporarily stashes uncommitted local changes to give you a clean working directory?',
      codeSnippet: `git stash push -m "WIP feature"
git stash pop`,
      options: ['git stash', 'git reset --hard', 'git checkout .', 'git clean -fd'],
      correctAnswerIndex: 0,
      explanation: 'git stash saves uncommitted modifications (staged and unstaged) into a temporary stack.'
    },
    {
      id: 'git-3',
      category: 'Git & DevOps',
      question: 'What is the primary benefit of Docker Multi-stage builds?',
      codeSnippet: `FROM node:18 AS builder
WORKDIR /app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html`,
      options: [
        'Significantly reduces production container image size by copying only build artifacts into minimal final runtime image',
        'Compiles Docker containers into Windows executables',
        'Runs multiple containers on single port',
        'Increases build download speeds automatically'
      ],
      correctAnswerIndex: 0,
      explanation: 'Multi-stage builds leave compiler tools and devDependencies behind, producing lightweight runtime images.'
    },
    {
      id: 'git-4',
      category: 'Git & DevOps',
      question: 'What is `git cherry-pick <commit-hash>` used for?',
      options: [
        'Applies the exact changes introduced by an existing commit from another branch onto current branch',
        'Deletes specific commit from remote repository',
        'Finds memory leak commit via binary search',
        'Merges all open pull requests'
      ],
      correctAnswerIndex: 0,
      explanation: 'cherry-pick selects a specific commit by hash and applies its diff to the active HEAD branch.'
    },
    {
      id: 'git-5',
      category: 'Git & DevOps',
      question: 'What is the difference between continuous integration (CI) and continuous deployment (CD)?',
      options: [
        'CI automates code building and testing on commit; CD automates deploying tested code directly to staging/production environments',
        'CI handles frontend; CD handles backend',
        'CI is for Git; CD is for SVN',
        'They are identical concepts'
      ],
      correctAnswerIndex: 0,
      explanation: 'CI ensures code quality through automated build/test workflows; CD automates release deployment pipelines.'
    },
    {
      id: 'git-6',
      category: 'Git & DevOps',
      question: 'What does `git bisect` command do during bug troubleshooting?',
      options: [
        'Uses binary search to isolate the specific commit that introduced a bug or regression',
        'Splits large repository into submodules',
        'Reverts last 10 commits',
        'Diffs two remote branches'
      ],
      correctAnswerIndex: 0,
      explanation: 'git bisect checks out commits between good and bad markers using binary search to find the bad commit quickly.'
    },
    {
      id: 'git-7',
      category: 'Git & DevOps',
      question: 'What is the purpose of Kubernetes Ingress controller?',
      options: [
        'Manages external HTTP/HTTPS traffic access to services within a Kubernetes cluster (routing, SSL termination)',
        'Compiles Dockerfile into container image',
        'Monitors CPU temperature of cluster nodes',
        'Backs up database volumes to S3'
      ],
      correctAnswerIndex: 0,
      explanation: 'Ingress acts as a smart layer 7 reverse proxy routing external web traffic to cluster services.'
    },
    {
      id: 'git-8',
      category: 'Git & DevOps',
      question: 'What command safely undoes a published remote commit by creating a new inverse commit?',
      options: ['git revert <commit-hash>', 'git reset --hard HEAD~1', 'git push --force', 'git checkout HEAD^'],
      correctAnswerIndex: 0,
      explanation: '`git revert` creates a new commit that undoes specified commit changes without rewriting public branch history.'
    },
    {
      id: 'git-9',
      category: 'Git & DevOps',
      question: 'What is Infrastructure as Code (IaC) using tools like Terraform?',
      options: [
        'Managing and provisioning infrastructure resources using version-controlled declarative configuration files',
        'Writing backend server code in SQL',
        'Running Linux commands inside web browsers',
        'Automating CSS styles generation'
      ],
      correctAnswerIndex: 0,
      explanation: 'IaC defines cloud infra (VMs, networks, DBs) as code files for reproducible, automated deployments.'
    },
    {
      id: 'git-10',
      category: 'Git & DevOps',
      question: 'What does `docker-compose.yml` file configure?',
      options: [
        'Defines and runs multi-container Docker applications, networks, and persistent storage volumes',
        'Configures Linux kernel parameters',
        'Generates SSL security certificates',
        'Installs Node npm packages'
      ],
      correctAnswerIndex: 0,
      explanation: 'Docker Compose allows orchestrating multi-container environments (e.g. app + DB + redis) with a single command.'
    },
    {
      id: 'git-11',
      category: 'Git & DevOps',
      question: 'What is the difference between `git fetch` and `git pull`?',
      options: [
        '`git fetch` downloads remote commits without modifying local working copy; `git pull` fetches AND automatically merges remote branch into local branch',
        '`git pull` downloads without merging; `git fetch` forces merge',
        '`git fetch` uploads code to GitHub; `git pull` downloads',
        'They are identical'
      ],
      correctAnswerIndex: 0,
      explanation: '`git pull` is shorthand for `git fetch` followed immediately by `git merge FETCH_HEAD`.'
    },
    {
      id: 'git-12',
      category: 'Git & DevOps',
      question: 'What is a Reverse Proxy (like NGINX) used for in web deployments?',
      options: [
        'Receives client requests, performs SSL termination, load balancing, caching, and forwards traffic to backend servers',
        'Renders React JSX components into HTML',
        'Generates database indexes',
        'Scans code for syntax errors'
      ],
      correctAnswerIndex: 0,
      explanation: 'Reverse proxy sits in front of backend servers for security, load balancing, caching, and SSL processing.'
    }
  ],

  'Data Structures': [
    {
      id: 'ds-1',
      category: 'Data Structures',
      question: 'What is the average and worst-case time complexity of QuickSort algorithm?',
      options: ['O(N log N) average, O(N^2) worst case', 'O(N) average, O(N log N) worst case', 'O(N^2) average, O(N^2) worst case', 'O(log N) average, O(N) worst case'],
      correctAnswerIndex: 0,
      explanation: 'QuickSort averages O(N log N) partition splits, but degrades to O(N^2) if pivot choices are consistently poor (e.g. sorted input with bad pivot).'
    },
    {
      id: 'ds-2',
      category: 'Data Structures',
      question: 'Which data structure operates on a Last-In, First-Out (LIFO) order?',
      options: ['Stack', 'Queue', 'Array', 'Linked List'],
      correctAnswerIndex: 0,
      explanation: 'Stack adds (push) and removes (pop) elements from the top end following LIFO principle.'
    },
    {
      id: 'ds-3',
      category: 'Data Structures',
      question: 'What is the worst-case lookup time complexity in a balanced Binary Search Tree (AVL / Red-Black Tree)?',
      options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
      correctAnswerIndex: 0,
      explanation: 'Self-balancing binary trees maintain height h <= 2 log N, guaranteeing O(log N) search, insertion, and deletion.'
    },
    {
      id: 'ds-4',
      category: 'Data Structures',
      question: 'Which algorithm finds the shortest path between a source node and all other nodes in a weighted graph with non-negative edge weights?',
      options: ['Dijkstra\'s Algorithm', 'Breadth-First Search (BFS)', 'Kruskal\'s Algorithm', 'Floyd-Warshall Algorithm'],
      correctAnswerIndex: 0,
      explanation: 'Dijkstra uses a priority queue min-heap O((V + E) log V) for single-source shortest paths on non-negative weighted graphs.'
    },
    {
      id: 'ds-5',
      category: 'Data Structures',
      question: 'What is the space complexity of Depth-First Search (DFS) on a tree of height H?',
      options: ['O(H) due to call stack recursion depth', 'O(V + E)', 'O(1)', 'O(2^H)'],
      correctAnswerIndex: 0,
      explanation: 'DFS keeps at most H node frames on the call stack at any time during tree traversal.'
    },
    {
      id: 'ds-6',
      category: 'Data Structures',
      question: 'What is the time complexity to access an element by index in a contiguous Array vs Singly Linked List?',
      options: ['Array: O(1); Linked List: O(N)', 'Array: O(N); Linked List: O(1)', 'Both are O(1)', 'Both are O(N)'],
      correctAnswerIndex: 0,
      explanation: 'Arrays compute memory offset `base + index * size` in O(1). Linked lists must traverse node pointers sequentially O(N).'
    },
    {
      id: 'ds-7',
      category: 'Data Structures',
      question: 'What technique in Dynamic Programming optimizes recursive functions by storing results of expensive function calls?',
      codeSnippet: `memo = {}
def fib(n):
    if n in memo: return memo[n]
    if n <= 2: return 1
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]`,
      options: ['Memoization (Top-Down)', 'Greedy Choice', 'Divide and Conquer', 'Backtracking'],
      correctAnswerIndex: 0,
      explanation: 'Memoization stores evaluation results of subproblems to avoid redundant recursive re-computation.'
    },
    {
      id: 'ds-8',
      category: 'Data Structures',
      question: 'What is the time complexity of building a Binary Heap from an unordered array of N elements (Heapify)?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'],
      correctAnswerIndex: 0,
      explanation: 'Bottom-up heap construction runs in mathematically proven linear O(N) time.'
    },
    {
      id: 'ds-9',
      category: 'Data Structures',
      question: 'How do you detect a cycle in a Singly Linked List in O(1) auxiliary space?',
      options: [
        'Floyd\'s Cycle Finding Algorithm (Slow and Fast pointers / Tortoise and Hare)',
        'Hash set node tracking',
        'Binary search on list pointers',
        'Reverse the linked list twice'
      ],
      correctAnswerIndex: 0,
      explanation: 'Floyd\'s algorithm moves slow pointer 1 step and fast pointer 2 steps; if a cycle exists, pointers will meet.'
    },
    {
      id: 'ds-10',
      category: 'Data Structures',
      question: 'What is the amortized time complexity of inserting an element into a dynamic array (like std::vector or Python list)?',
      options: ['O(1) amortized', 'O(N) always', 'O(log N)', 'O(N^2)'],
      correctAnswerIndex: 0,
      explanation: 'Dynamic arrays double capacity on overflow. Doubling cost is spread over N insertions, giving O(1) amortized insertion cost.'
    },
    {
      id: 'ds-11',
      category: 'Data Structures',
      question: 'Which graph traversal uses a Queue data structure?',
      options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Topological Sort (Tarjan)', 'Pre-order Traversal'],
      correctAnswerIndex: 0,
      explanation: 'BFS explores graph level by level using a FIFO Queue.'
    },
    {
      id: 'ds-12',
      category: 'Data Structures',
      question: 'What is the time complexity of searching for a key in a Hash Table with good hash distribution?',
      options: ['O(1) average time', 'O(log N)', 'O(N log N)', 'O(N^2)'],
      correctAnswerIndex: 0,
      explanation: 'Hash functions compute bucket index in O(1) constant average time.'
    }
  ]
};

export const ASSESSMENT_DOMAINS = [
  { id: 'All', label: '🌟 Full Stack Comprehensive (15 Questions)', count: 15 },
  { id: 'React', label: '⚛️ React & Frontend (12 Questions)', count: 12 },
  { id: 'JavaScript', label: '⚡ JavaScript & TypeScript (12 Questions)', count: 12 },
  { id: 'Python', label: '🐍 Python & FastAPI Backend (12 Questions)', count: 12 },
  { id: 'C++', label: '⚙️ C / C++ Core Systems (12 Questions)', count: 12 },
  { id: 'Java', label: '☕ Java & Spring Framework (12 Questions)', count: 12 },
  { id: 'SQL Databases', label: '🗄️ SQL & Database Architecture (12 Questions)', count: 12 },
  { id: 'Git & DevOps', label: '🔀 Git, Docker & DevOps (12 Questions)', count: 12 },
  { id: 'Data Structures', label: '🧩 Data Structures & Algorithms (12 Questions)', count: 12 }
];
