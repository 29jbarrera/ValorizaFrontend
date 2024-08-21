import {
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-P3H2Q3Z7.js";

// node_modules/seedrandom/lib/alea.js
var require_alea = __commonJS({
  "node_modules/seedrandom/lib/alea.js"(exports, module) {
    (function(global, module2, define2) {
      function Alea(seed) {
        var me2 = this, mash = Mash();
        me2.next = function() {
          var t2 = 2091639 * me2.s0 + me2.c * 23283064365386963e-26;
          me2.s0 = me2.s1;
          me2.s1 = me2.s2;
          return me2.s2 = t2 - (me2.c = t2 | 0);
        };
        me2.c = 1;
        me2.s0 = mash(" ");
        me2.s1 = mash(" ");
        me2.s2 = mash(" ");
        me2.s0 -= mash(seed);
        if (me2.s0 < 0) {
          me2.s0 += 1;
        }
        me2.s1 -= mash(seed);
        if (me2.s1 < 0) {
          me2.s1 += 1;
        }
        me2.s2 -= mash(seed);
        if (me2.s2 < 0) {
          me2.s2 += 1;
        }
        mash = null;
      }
      function copy(f3, t2) {
        t2.c = f3.c;
        t2.s0 = f3.s0;
        t2.s1 = f3.s1;
        t2.s2 = f3.s2;
        return t2;
      }
      function impl(seed, opts) {
        var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
        prng.int32 = function() {
          return xg.next() * 4294967296 | 0;
        };
        prng.double = function() {
          return prng() + (prng() * 2097152 | 0) * 11102230246251565e-32;
        };
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      function Mash() {
        var n2 = 4022871197;
        var mash = function(data) {
          data = String(data);
          for (var i2 = 0; i2 < data.length; i2++) {
            n2 += data.charCodeAt(i2);
            var h2 = 0.02519603282416938 * n2;
            n2 = h2 >>> 0;
            h2 -= n2;
            h2 *= n2;
            n2 = h2 >>> 0;
            h2 -= n2;
            n2 += h2 * 4294967296;
          }
          return (n2 >>> 0) * 23283064365386963e-26;
        };
        return mash;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.alea = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// node_modules/seedrandom/lib/xor128.js
var require_xor128 = __commonJS({
  "node_modules/seedrandom/lib/xor128.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me2 = this, strseed = "";
        me2.x = 0;
        me2.y = 0;
        me2.z = 0;
        me2.w = 0;
        me2.next = function() {
          var t2 = me2.x ^ me2.x << 11;
          me2.x = me2.y;
          me2.y = me2.z;
          me2.z = me2.w;
          return me2.w ^= me2.w >>> 19 ^ t2 ^ t2 >>> 8;
        };
        if (seed === (seed | 0)) {
          me2.x = seed;
        } else {
          strseed += seed;
        }
        for (var k2 = 0; k2 < strseed.length + 64; k2++) {
          me2.x ^= strseed.charCodeAt(k2) | 0;
          me2.next();
        }
      }
      function copy(f3, t2) {
        t2.x = f3.x;
        t2.y = f3.y;
        t2.z = f3.z;
        t2.w = f3.w;
        return t2;
      }
      function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xor128 = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// node_modules/seedrandom/lib/xorwow.js
var require_xorwow = __commonJS({
  "node_modules/seedrandom/lib/xorwow.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me2 = this, strseed = "";
        me2.next = function() {
          var t2 = me2.x ^ me2.x >>> 2;
          me2.x = me2.y;
          me2.y = me2.z;
          me2.z = me2.w;
          me2.w = me2.v;
          return (me2.d = me2.d + 362437 | 0) + (me2.v = me2.v ^ me2.v << 4 ^ (t2 ^ t2 << 1)) | 0;
        };
        me2.x = 0;
        me2.y = 0;
        me2.z = 0;
        me2.w = 0;
        me2.v = 0;
        if (seed === (seed | 0)) {
          me2.x = seed;
        } else {
          strseed += seed;
        }
        for (var k2 = 0; k2 < strseed.length + 64; k2++) {
          me2.x ^= strseed.charCodeAt(k2) | 0;
          if (k2 == strseed.length) {
            me2.d = me2.x << 10 ^ me2.x >>> 4;
          }
          me2.next();
        }
      }
      function copy(f3, t2) {
        t2.x = f3.x;
        t2.y = f3.y;
        t2.z = f3.z;
        t2.w = f3.w;
        t2.v = f3.v;
        t2.d = f3.d;
        return t2;
      }
      function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xorwow = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// node_modules/seedrandom/lib/xorshift7.js
var require_xorshift7 = __commonJS({
  "node_modules/seedrandom/lib/xorshift7.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me2 = this;
        me2.next = function() {
          var X2 = me2.x, i2 = me2.i, t2, v2, w2;
          t2 = X2[i2];
          t2 ^= t2 >>> 7;
          v2 = t2 ^ t2 << 24;
          t2 = X2[i2 + 1 & 7];
          v2 ^= t2 ^ t2 >>> 10;
          t2 = X2[i2 + 3 & 7];
          v2 ^= t2 ^ t2 >>> 3;
          t2 = X2[i2 + 4 & 7];
          v2 ^= t2 ^ t2 << 7;
          t2 = X2[i2 + 7 & 7];
          t2 = t2 ^ t2 << 13;
          v2 ^= t2 ^ t2 << 9;
          X2[i2] = v2;
          me2.i = i2 + 1 & 7;
          return v2;
        };
        function init(me3, seed2) {
          var j2, w2, X2 = [];
          if (seed2 === (seed2 | 0)) {
            w2 = X2[0] = seed2;
          } else {
            seed2 = "" + seed2;
            for (j2 = 0; j2 < seed2.length; ++j2) {
              X2[j2 & 7] = X2[j2 & 7] << 15 ^ seed2.charCodeAt(j2) + X2[j2 + 1 & 7] << 13;
            }
          }
          while (X2.length < 8)
            X2.push(0);
          for (j2 = 0; j2 < 8 && X2[j2] === 0; ++j2)
            ;
          if (j2 == 8)
            w2 = X2[7] = -1;
          else
            w2 = X2[j2];
          me3.x = X2;
          me3.i = 0;
          for (j2 = 256; j2 > 0; --j2) {
            me3.next();
          }
        }
        init(me2, seed);
      }
      function copy(f3, t2) {
        t2.x = f3.x.slice();
        t2.i = f3.i;
        return t2;
      }
      function impl(seed, opts) {
        if (seed == null)
          seed = +/* @__PURE__ */ new Date();
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (state.x)
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xorshift7 = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// node_modules/seedrandom/lib/xor4096.js
var require_xor4096 = __commonJS({
  "node_modules/seedrandom/lib/xor4096.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me2 = this;
        me2.next = function() {
          var w2 = me2.w, X2 = me2.X, i2 = me2.i, t2, v2;
          me2.w = w2 = w2 + 1640531527 | 0;
          v2 = X2[i2 + 34 & 127];
          t2 = X2[i2 = i2 + 1 & 127];
          v2 ^= v2 << 13;
          t2 ^= t2 << 17;
          v2 ^= v2 >>> 15;
          t2 ^= t2 >>> 12;
          v2 = X2[i2] = v2 ^ t2;
          me2.i = i2;
          return v2 + (w2 ^ w2 >>> 16) | 0;
        };
        function init(me3, seed2) {
          var t2, v2, i2, j2, w2, X2 = [], limit = 128;
          if (seed2 === (seed2 | 0)) {
            v2 = seed2;
            seed2 = null;
          } else {
            seed2 = seed2 + "\0";
            v2 = 0;
            limit = Math.max(limit, seed2.length);
          }
          for (i2 = 0, j2 = -32; j2 < limit; ++j2) {
            if (seed2)
              v2 ^= seed2.charCodeAt((j2 + 32) % seed2.length);
            if (j2 === 0)
              w2 = v2;
            v2 ^= v2 << 10;
            v2 ^= v2 >>> 15;
            v2 ^= v2 << 4;
            v2 ^= v2 >>> 13;
            if (j2 >= 0) {
              w2 = w2 + 1640531527 | 0;
              t2 = X2[j2 & 127] ^= v2 + w2;
              i2 = 0 == t2 ? i2 + 1 : 0;
            }
          }
          if (i2 >= 128) {
            X2[(seed2 && seed2.length || 0) & 127] = -1;
          }
          i2 = 127;
          for (j2 = 4 * 128; j2 > 0; --j2) {
            v2 = X2[i2 + 34 & 127];
            t2 = X2[i2 = i2 + 1 & 127];
            v2 ^= v2 << 13;
            t2 ^= t2 << 17;
            v2 ^= v2 >>> 15;
            t2 ^= t2 >>> 12;
            X2[i2] = v2 ^ t2;
          }
          me3.w = w2;
          me3.X = X2;
          me3.i = i2;
        }
        init(me2, seed);
      }
      function copy(f3, t2) {
        t2.i = f3.i;
        t2.w = f3.w;
        t2.X = f3.X.slice();
        return t2;
      }
      ;
      function impl(seed, opts) {
        if (seed == null)
          seed = +/* @__PURE__ */ new Date();
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (state.X)
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.xor4096 = impl;
      }
    })(
      exports,
      // window object or global
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// node_modules/seedrandom/lib/tychei.js
var require_tychei = __commonJS({
  "node_modules/seedrandom/lib/tychei.js"(exports, module) {
    (function(global, module2, define2) {
      function XorGen(seed) {
        var me2 = this, strseed = "";
        me2.next = function() {
          var b2 = me2.b, c2 = me2.c, d2 = me2.d, a = me2.a;
          b2 = b2 << 25 ^ b2 >>> 7 ^ c2;
          c2 = c2 - d2 | 0;
          d2 = d2 << 24 ^ d2 >>> 8 ^ a;
          a = a - b2 | 0;
          me2.b = b2 = b2 << 20 ^ b2 >>> 12 ^ c2;
          me2.c = c2 = c2 - d2 | 0;
          me2.d = d2 << 16 ^ c2 >>> 16 ^ a;
          return me2.a = a - b2 | 0;
        };
        me2.a = 0;
        me2.b = 0;
        me2.c = 2654435769 | 0;
        me2.d = 1367130551;
        if (seed === Math.floor(seed)) {
          me2.a = seed / 4294967296 | 0;
          me2.b = seed | 0;
        } else {
          strseed += seed;
        }
        for (var k2 = 0; k2 < strseed.length + 20; k2++) {
          me2.b ^= strseed.charCodeAt(k2) | 0;
          me2.next();
        }
      }
      function copy(f3, t2) {
        t2.a = f3.a;
        t2.b = f3.b;
        t2.c = f3.c;
        t2.d = f3.d;
        return t2;
      }
      ;
      function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
          return (xg.next() >>> 0) / 4294967296;
        };
        prng.double = function() {
          do {
            var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
          } while (result === 0);
          return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
          if (typeof state == "object")
            copy(state, xg);
          prng.state = function() {
            return copy(xg, {});
          };
        }
        return prng;
      }
      if (module2 && module2.exports) {
        module2.exports = impl;
      } else if (define2 && define2.amd) {
        define2(function() {
          return impl;
        });
      } else {
        this.tychei = impl;
      }
    })(
      exports,
      typeof module == "object" && module,
      // present in node.js
      typeof define == "function" && define
      // present with an AMD loader
    );
  }
});

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_2, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/seedrandom/seedrandom.js
var require_seedrandom = __commonJS({
  "node_modules/seedrandom/seedrandom.js"(exports, module) {
    (function(global, pool, math) {
      var width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto;
      function seedrandom(seed, options, callback) {
        var key = [];
        options = options == true ? { entropy: true } : options || {};
        var shortseed = mixkey(flatten(
          options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed,
          3
        ), key);
        var arc4 = new ARC4(key);
        var prng = function() {
          var n2 = arc4.g(chunks), d2 = startdenom, x2 = 0;
          while (n2 < significance) {
            n2 = (n2 + x2) * width;
            d2 *= width;
            x2 = arc4.g(1);
          }
          while (n2 >= overflow) {
            n2 /= 2;
            d2 /= 2;
            x2 >>>= 1;
          }
          return (n2 + x2) / d2;
        };
        prng.int32 = function() {
          return arc4.g(4) | 0;
        };
        prng.quick = function() {
          return arc4.g(4) / 4294967296;
        };
        prng.double = prng;
        mixkey(tostring(arc4.S), pool);
        return (options.pass || callback || function(prng2, seed2, is_math_call, state) {
          if (state) {
            if (state.S) {
              copy(state, arc4);
            }
            prng2.state = function() {
              return copy(arc4, {});
            };
          }
          if (is_math_call) {
            math[rngname] = prng2;
            return seed2;
          } else
            return prng2;
        })(
          prng,
          shortseed,
          "global" in options ? options.global : this == math,
          options.state
        );
      }
      function ARC4(key) {
        var t2, keylen = key.length, me2 = this, i2 = 0, j2 = me2.i = me2.j = 0, s2 = me2.S = [];
        if (!keylen) {
          key = [keylen++];
        }
        while (i2 < width) {
          s2[i2] = i2++;
        }
        for (i2 = 0; i2 < width; i2++) {
          s2[i2] = s2[j2 = mask & j2 + key[i2 % keylen] + (t2 = s2[i2])];
          s2[j2] = t2;
        }
        (me2.g = function(count) {
          var t3, r2 = 0, i3 = me2.i, j3 = me2.j, s3 = me2.S;
          while (count--) {
            t3 = s3[i3 = mask & i3 + 1];
            r2 = r2 * width + s3[mask & (s3[i3] = s3[j3 = mask & j3 + t3]) + (s3[j3] = t3)];
          }
          me2.i = i3;
          me2.j = j3;
          return r2;
        })(width);
      }
      function copy(f3, t2) {
        t2.i = f3.i;
        t2.j = f3.j;
        t2.S = f3.S.slice();
        return t2;
      }
      ;
      function flatten(obj, depth) {
        var result = [], typ = typeof obj, prop;
        if (depth && typ == "object") {
          for (prop in obj) {
            try {
              result.push(flatten(obj[prop], depth - 1));
            } catch (e2) {
            }
          }
        }
        return result.length ? result : typ == "string" ? obj : obj + "\0";
      }
      function mixkey(seed, key) {
        var stringseed = seed + "", smear, j2 = 0;
        while (j2 < stringseed.length) {
          key[mask & j2] = mask & (smear ^= key[mask & j2] * 19) + stringseed.charCodeAt(j2++);
        }
        return tostring(key);
      }
      function autoseed() {
        try {
          var out;
          if (nodecrypto && (out = nodecrypto.randomBytes)) {
            out = out(width);
          } else {
            out = new Uint8Array(width);
            (global.crypto || global.msCrypto).getRandomValues(out);
          }
          return tostring(out);
        } catch (e2) {
          var browser = global.navigator, plugins = browser && browser.plugins;
          return [+/* @__PURE__ */ new Date(), global, plugins, global.screen, tostring(pool)];
        }
      }
      function tostring(a) {
        return String.fromCharCode.apply(0, a);
      }
      mixkey(math.random(), pool);
      if (typeof module == "object" && module.exports) {
        module.exports = seedrandom;
        try {
          nodecrypto = require_crypto();
        } catch (ex) {
        }
      } else if (typeof define == "function" && define.amd) {
        define(function() {
          return seedrandom;
        });
      } else {
        math["seed" + rngname] = seedrandom;
      }
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      typeof self !== "undefined" ? self : exports,
      [],
      // pool: entropy pool starts empty
      Math
      // math: package containing random, pow, and seedrandom
    );
  }
});

// node_modules/seedrandom/index.js
var require_seedrandom2 = __commonJS({
  "node_modules/seedrandom/index.js"(exports, module) {
    var alea = require_alea();
    var xor128 = require_xor128();
    var xorwow = require_xorwow();
    var xorshift7 = require_xorshift7();
    var xor4096 = require_xor4096();
    var tychei = require_tychei();
    var sr = require_seedrandom();
    sr.alea = alea;
    sr.xor128 = xor128;
    sr.xorwow = xorwow;
    sr.xorshift7 = xorshift7;
    sr.xor4096 = xor4096;
    sr.tychei = tychei;
    module.exports = sr;
  }
});

// node_modules/@ngneat/falso/index.js
var import_seedrandom = __toESM(require_seedrandom2());

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (i2 = 0; i2 < 256; ++i2) {
  byteToHex.push((i2 + 256).toString(16).substr(1));
}
var i2;
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var stringify_default = stringify;

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v2;
  var arr = new Uint8Array(16);
  arr[0] = (v2 = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v2 >>> 16 & 255;
  arr[2] = v2 >>> 8 & 255;
  arr[3] = v2 & 255;
  arr[4] = (v2 = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v2 & 255;
  arr[6] = (v2 = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v2 & 255;
  arr[8] = (v2 = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v2 & 255;
  arr[10] = (v2 = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v2 / 4294967296 & 255;
  arr[12] = v2 >>> 24 & 255;
  arr[13] = v2 >>> 16 & 255;
  arr[14] = v2 >>> 8 & 255;
  arr[15] = v2 & 255;
  return arr;
}
var parse_default = parse;

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    bytes.push(str.charCodeAt(i2));
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35_default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = bytes[i2];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i2 = 0; i2 < msg.length; ++i2) {
      bytes[i2] = msg.charCodeAt(i2);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i2 = 0; i2 < length32; i2 += 8) {
    var x2 = input[i2 >> 5] >>> i2 % 32 & 255;
    var hex = parseInt(hexTab.charAt(x2 >>> 4 & 15) + hexTab.charAt(x2 & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x2, len) {
  x2[len >> 5] |= 128 << len % 32;
  x2[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b2 = -271733879;
  var c2 = -1732584194;
  var d2 = 271733878;
  for (var i2 = 0; i2 < x2.length; i2 += 16) {
    var olda = a;
    var oldb = b2;
    var oldc = c2;
    var oldd = d2;
    a = md5ff(a, b2, c2, d2, x2[i2], 7, -680876936);
    d2 = md5ff(d2, a, b2, c2, x2[i2 + 1], 12, -389564586);
    c2 = md5ff(c2, d2, a, b2, x2[i2 + 2], 17, 606105819);
    b2 = md5ff(b2, c2, d2, a, x2[i2 + 3], 22, -1044525330);
    a = md5ff(a, b2, c2, d2, x2[i2 + 4], 7, -176418897);
    d2 = md5ff(d2, a, b2, c2, x2[i2 + 5], 12, 1200080426);
    c2 = md5ff(c2, d2, a, b2, x2[i2 + 6], 17, -1473231341);
    b2 = md5ff(b2, c2, d2, a, x2[i2 + 7], 22, -45705983);
    a = md5ff(a, b2, c2, d2, x2[i2 + 8], 7, 1770035416);
    d2 = md5ff(d2, a, b2, c2, x2[i2 + 9], 12, -1958414417);
    c2 = md5ff(c2, d2, a, b2, x2[i2 + 10], 17, -42063);
    b2 = md5ff(b2, c2, d2, a, x2[i2 + 11], 22, -1990404162);
    a = md5ff(a, b2, c2, d2, x2[i2 + 12], 7, 1804603682);
    d2 = md5ff(d2, a, b2, c2, x2[i2 + 13], 12, -40341101);
    c2 = md5ff(c2, d2, a, b2, x2[i2 + 14], 17, -1502002290);
    b2 = md5ff(b2, c2, d2, a, x2[i2 + 15], 22, 1236535329);
    a = md5gg(a, b2, c2, d2, x2[i2 + 1], 5, -165796510);
    d2 = md5gg(d2, a, b2, c2, x2[i2 + 6], 9, -1069501632);
    c2 = md5gg(c2, d2, a, b2, x2[i2 + 11], 14, 643717713);
    b2 = md5gg(b2, c2, d2, a, x2[i2], 20, -373897302);
    a = md5gg(a, b2, c2, d2, x2[i2 + 5], 5, -701558691);
    d2 = md5gg(d2, a, b2, c2, x2[i2 + 10], 9, 38016083);
    c2 = md5gg(c2, d2, a, b2, x2[i2 + 15], 14, -660478335);
    b2 = md5gg(b2, c2, d2, a, x2[i2 + 4], 20, -405537848);
    a = md5gg(a, b2, c2, d2, x2[i2 + 9], 5, 568446438);
    d2 = md5gg(d2, a, b2, c2, x2[i2 + 14], 9, -1019803690);
    c2 = md5gg(c2, d2, a, b2, x2[i2 + 3], 14, -187363961);
    b2 = md5gg(b2, c2, d2, a, x2[i2 + 8], 20, 1163531501);
    a = md5gg(a, b2, c2, d2, x2[i2 + 13], 5, -1444681467);
    d2 = md5gg(d2, a, b2, c2, x2[i2 + 2], 9, -51403784);
    c2 = md5gg(c2, d2, a, b2, x2[i2 + 7], 14, 1735328473);
    b2 = md5gg(b2, c2, d2, a, x2[i2 + 12], 20, -1926607734);
    a = md5hh(a, b2, c2, d2, x2[i2 + 5], 4, -378558);
    d2 = md5hh(d2, a, b2, c2, x2[i2 + 8], 11, -2022574463);
    c2 = md5hh(c2, d2, a, b2, x2[i2 + 11], 16, 1839030562);
    b2 = md5hh(b2, c2, d2, a, x2[i2 + 14], 23, -35309556);
    a = md5hh(a, b2, c2, d2, x2[i2 + 1], 4, -1530992060);
    d2 = md5hh(d2, a, b2, c2, x2[i2 + 4], 11, 1272893353);
    c2 = md5hh(c2, d2, a, b2, x2[i2 + 7], 16, -155497632);
    b2 = md5hh(b2, c2, d2, a, x2[i2 + 10], 23, -1094730640);
    a = md5hh(a, b2, c2, d2, x2[i2 + 13], 4, 681279174);
    d2 = md5hh(d2, a, b2, c2, x2[i2], 11, -358537222);
    c2 = md5hh(c2, d2, a, b2, x2[i2 + 3], 16, -722521979);
    b2 = md5hh(b2, c2, d2, a, x2[i2 + 6], 23, 76029189);
    a = md5hh(a, b2, c2, d2, x2[i2 + 9], 4, -640364487);
    d2 = md5hh(d2, a, b2, c2, x2[i2 + 12], 11, -421815835);
    c2 = md5hh(c2, d2, a, b2, x2[i2 + 15], 16, 530742520);
    b2 = md5hh(b2, c2, d2, a, x2[i2 + 2], 23, -995338651);
    a = md5ii(a, b2, c2, d2, x2[i2], 6, -198630844);
    d2 = md5ii(d2, a, b2, c2, x2[i2 + 7], 10, 1126891415);
    c2 = md5ii(c2, d2, a, b2, x2[i2 + 14], 15, -1416354905);
    b2 = md5ii(b2, c2, d2, a, x2[i2 + 5], 21, -57434055);
    a = md5ii(a, b2, c2, d2, x2[i2 + 12], 6, 1700485571);
    d2 = md5ii(d2, a, b2, c2, x2[i2 + 3], 10, -1894986606);
    c2 = md5ii(c2, d2, a, b2, x2[i2 + 10], 15, -1051523);
    b2 = md5ii(b2, c2, d2, a, x2[i2 + 1], 21, -2054922799);
    a = md5ii(a, b2, c2, d2, x2[i2 + 8], 6, 1873313359);
    d2 = md5ii(d2, a, b2, c2, x2[i2 + 15], 10, -30611744);
    c2 = md5ii(c2, d2, a, b2, x2[i2 + 6], 15, -1560198380);
    b2 = md5ii(b2, c2, d2, a, x2[i2 + 13], 21, 1309151649);
    a = md5ii(a, b2, c2, d2, x2[i2 + 4], 6, -145523070);
    d2 = md5ii(d2, a, b2, c2, x2[i2 + 11], 10, -1120210379);
    c2 = md5ii(c2, d2, a, b2, x2[i2 + 2], 15, 718787259);
    b2 = md5ii(b2, c2, d2, a, x2[i2 + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b2 = safeAdd(b2, oldb);
    c2 = safeAdd(c2, oldc);
    d2 = safeAdd(d2, oldd);
  }
  return [a, b2, c2, d2];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i2 = 0; i2 < length8; i2 += 8) {
    output[i2 >> 5] |= (input[i2 / 8] & 255) << i2 % 32;
  }
  return output;
}
function safeAdd(x2, y2) {
  var lsw = (x2 & 65535) + (y2 & 65535);
  var msw = (x2 >> 16) + (y2 >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q2, a, b2, x2, s2, t2) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q2), safeAdd(x2, t2)), s2), b2);
}
function md5ff(a, b2, c2, d2, x2, s2, t2) {
  return md5cmn(b2 & c2 | ~b2 & d2, a, b2, x2, s2, t2);
}
function md5gg(a, b2, c2, d2, x2, s2, t2) {
  return md5cmn(b2 & d2 | c2 & ~d2, a, b2, x2, s2, t2);
}
function md5hh(a, b2, c2, d2, x2, s2, t2) {
  return md5cmn(b2 ^ c2 ^ d2, a, b2, x2, s2, t2);
}
function md5ii(a, b2, c2, d2, x2, s2, t2) {
  return md5cmn(c2 ^ (b2 | ~d2), a, b2, x2, s2, t2);
}
var md5_default = md5;

// node_modules/uuid/dist/esm-browser/v3.js
var v3 = v35_default("v3", 48, md5_default);

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i2 = 0; i2 < 16; ++i2) {
      buf[offset + i2] = rnds[i2];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default = v4;

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s2, x2, y2, z2) {
  switch (s2) {
    case 0:
      return x2 & y2 ^ ~x2 & z2;
    case 1:
      return x2 ^ y2 ^ z2;
    case 2:
      return x2 & y2 ^ x2 & z2 ^ y2 & z2;
    case 3:
      return x2 ^ y2 ^ z2;
  }
}
function ROTL(x2, n2) {
  return x2 << n2 | x2 >>> 32 - n2;
}
function sha1(bytes) {
  var K2 = [1518500249, 1859775393, 2400959708, 3395469782];
  var H2 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i2 = 0; i2 < msg.length; ++i2) {
      bytes.push(msg.charCodeAt(i2));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l2 = bytes.length / 4 + 2;
  var N2 = Math.ceil(l2 / 16);
  var M2 = new Array(N2);
  for (var _i2 = 0; _i2 < N2; ++_i2) {
    var arr = new Uint32Array(16);
    for (var j2 = 0; j2 < 16; ++j2) {
      arr[j2] = bytes[_i2 * 64 + j2 * 4] << 24 | bytes[_i2 * 64 + j2 * 4 + 1] << 16 | bytes[_i2 * 64 + j2 * 4 + 2] << 8 | bytes[_i2 * 64 + j2 * 4 + 3];
    }
    M2[_i2] = arr;
  }
  M2[N2 - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M2[N2 - 1][14] = Math.floor(M2[N2 - 1][14]);
  M2[N2 - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i22 = 0; _i22 < N2; ++_i22) {
    var W2 = new Uint32Array(80);
    for (var t2 = 0; t2 < 16; ++t2) {
      W2[t2] = M2[_i22][t2];
    }
    for (var _t2 = 16; _t2 < 80; ++_t2) {
      W2[_t2] = ROTL(W2[_t2 - 3] ^ W2[_t2 - 8] ^ W2[_t2 - 14] ^ W2[_t2 - 16], 1);
    }
    var a = H2[0];
    var b2 = H2[1];
    var c2 = H2[2];
    var d2 = H2[3];
    var e2 = H2[4];
    for (var _t22 = 0; _t22 < 80; ++_t22) {
      var s2 = Math.floor(_t22 / 20);
      var T2 = ROTL(a, 5) + f(s2, b2, c2, d2) + e2 + K2[s2] + W2[_t22] >>> 0;
      e2 = d2;
      d2 = c2;
      c2 = ROTL(b2, 30) >>> 0;
      b2 = a;
      a = T2;
    }
    H2[0] = H2[0] + a >>> 0;
    H2[1] = H2[1] + b2 >>> 0;
    H2[2] = H2[2] + c2 >>> 0;
    H2[3] = H2[3] + d2 >>> 0;
    H2[4] = H2[4] + e2 >>> 0;
  }
  return [H2[0] >> 24 & 255, H2[0] >> 16 & 255, H2[0] >> 8 & 255, H2[0] & 255, H2[1] >> 24 & 255, H2[1] >> 16 & 255, H2[1] >> 8 & 255, H2[1] & 255, H2[2] >> 24 & 255, H2[2] >> 16 & 255, H2[2] >> 8 & 255, H2[2] & 255, H2[3] >> 24 & 255, H2[3] >> 16 & 255, H2[3] >> 8 & 255, H2[3] & 255, H2[4] >> 24 & 255, H2[4] >> 16 & 255, H2[4] >> 8 & 255, H2[4] & 255];
}
var sha1_default = sha1;

// node_modules/uuid/dist/esm-browser/v5.js
var v5 = v35_default("v5", 80, sha1_default);

// node_modules/@ngneat/falso/index.js
var t = (0, import_seedrandom.default)();
function i() {
  return t();
}
function o(a) {
  t = (0, import_seedrandom.default)(a);
}
function n(e2, a) {
  let t2 = e2;
  if (Array.isArray(e2)) {
    let i2 = e2;
    a?.maxCharCount && "string" == typeof e2[0] && (i2 = e2.filter((e3) => e3.length <= a.maxCharCount)), t2 = () => r(i2);
  }
  return void 0 === a?.length ? t2(0) : Array.from({ length: a.length }, (e3, a2) => t2(a2));
}
function r(e2) {
  return e2[Math.floor(i() * e2.length)];
}
function s({ min: e2 = 1, max: a = 9999.99, fraction: t2 = 0 } = {}) {
  if (a < e2)
    throw new Error("Max must be bigger than min");
  return Number((i() * (a - e2) + e2).toFixed(t2));
}
var l = ["SCSI", "SMTP", "ADP", "TCP", "PNG", "EXE", "AI", "RAM", "RSS", "GB", "SSL", "CSS", "SAS", "SDD", "PCI", "IB", "SQL", "XML", "THX", "AGP", "HTTP", "SMS", "FTP", "JBOD", "XSS", "HDD", "JSON", "COM"];
function u(e2) {
  return n(l, e2);
}
var c = ["Fashion accessory", "Aiguillette", "Armband", "Autographer", "Baby sling", "Baseball cap", "Beanie", "Boutonnière", "Breast milk jewelry", "Breton", "Thomas Brigg & Sons", "Bum flap", "Button", "Capulana", "Card enclosure", "Cartwheel hat", "Caul", "Chatelaine", "Chemisette", "Cheopji", "Chinese hairpin", "Cigarette case", "Cigarette holder", "Coin purse", "Collar pin", "Compact", "Corsage", "Cufflink", "Cummerbund", "Daenggi", "Deep Blue Sea", "Doll hat", "Draped turban", "Dress hook", "Dush-toh", "Epaulette", "Evening glove", "Boa", "Flower bouquet", "Fluffy", "Folding clasp", "Frisette", "Garter", "Great Greenland Furhouse", "Hair drop", "Hair stick", "Hairnet", "Half hat", "Halo hat", "Hambiliya", "Hand cooler", "Hand fan", "Handbag", "Handkerchief", "Hidesign", "Inro", "Iron-on", "It bag", "Jeggings", "Jewellery", "Herbert Johnson", "Kittisol", "Lampshade hat", "Lapel pin", "Metal clay", "Metal couture", "Minaudière", "Mobile phone charm", "Money clip", "Muff", "Museum of Bags and Purses", "Mushroom hat", "Norigae", "Nosegay", "Obi", "Ojime", "Papworth Industries", "Partlet", "Peach basket hat", "Picture hat", "Pin trading", "Pin-back button", "Pocket protector", "Presidential sash", "Purse accessories", "Purse hook", "Reimiro", "Safety reflector", "Sash", "Scrunchie", "Shillelagh", "Shubi", "Skirt lifter", "Snood", "Snuff bottle", "Solar viewer", "Sporran", "Sunglasses", "Suspenders", "Sutton Hoo purse-lid", "Tasuki", "Tie chain", "Tie clip", "Tie pin", "Toupée", "Tuanshan", "Umbrella", "Walking stick", "Wallet", "Watch strap", "Wearable art", "Wearable computer", "Wearable technology", "Wig", "Wrist clasp", "Zibellino", "Apron", "Necklace", "Watch", "Socks", "Tie", "Bow tie", "Purse", "Ring", "Gloves", "Scarf", "Boots", "Mittens", "Stockings", "Earmuffs", "Hair clip", "Bobby pin", "Hair band", "Safety pin", "Pocket watch", "Beanie", "Cap", "Beret", "Straw hat", "Derby hat", "Helmet", "Top hat", "Mortar board"];
function d(e2) {
  return n(c, e2);
}
function h(e2) {
  const a = e2?.accountLength ?? 9;
  return n(() => Array(a).fill("#").join("").replace(/#/g, () => s({ min: 0, max: 9 }).toString()), e2);
}
var m = "0123456789";
var p = "abcdefghijklmnopqrstuvwxyz";
var y = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
var g = `${m}${p}${p.toUpperCase()}`;
function f2(e2 = 8, a = g) {
  let t2 = "";
  for (let o2 = e2; o2 > 0; --o2)
    t2 += a[Math.floor(i() * a.length)];
  return t2;
}
function b(e2) {
  if (!e2?.charType || e2?.chars)
    return n(() => f2(e2?.size, e2?.chars), e2);
  switch (e2.charType) {
    case "alpha":
      return n(() => f2(e2?.size, `${p}${p.toUpperCase()}`), e2);
    case "alphaNumeric":
      return n(() => f2(e2?.size, g), e2);
    case "numeric":
      return n(() => f2(e2?.size, m), e2);
    case "special":
      return n(() => f2(e2?.size, y), e2);
    default:
      return function(e3) {
        throw new Error(`Invalid charType: ${e3}`);
      }(e2.charType);
  }
}
function w(e2) {
  return n(p.split(""), e2);
}
function v(e2) {
  return n(() => r([true, false]), e2);
}
function k(e2) {
  const a = { min: e2?.min ?? 0, max: e2?.max ?? 999999, precision: e2?.precision, fraction: e2?.fraction };
  return n(() => {
    if (a.min === a.max)
      return a.min;
    const e3 = s(a);
    return void 0 !== a.precision ? Math.floor(e3 / a.precision) * a.precision : e3;
  }, e2);
}
function S(e2) {
  return n(() => v() ? w() : k({ min: 0, max: 9 }), e2);
}
var C = ["Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills", "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns", "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers", "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs", "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins", "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants", "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers", "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans"];
function A(e2) {
  return n(C, e2);
}
function M(e2) {
  const a = __spreadProps(__spreadValues({}, e2), { fraction: e2?.fraction ?? 2 }), t2 = e2?.symbol ?? "";
  return n(() => {
    const e3 = s(a);
    return t2 ? `${t2}${e3}` : e3;
  }, e2);
}
var T = ["bird", "cetacean", "rabbit", "bear", "cat", "snake", "cow", "insect", "crocodile", "horse", "fish", "dog", "lion"];
function B(e2) {
  return n(T, e2);
}
var I = ["Aardvark", "Aardwolf", "Abyssinian", "Abyssinian Guinea Pig", "Acadian Flycatcher", "Achrioptera Manga", "Ackie Monitor", "Addax", "Adelie Penguin", "Aesculapian snake", "Affenpinscher", "Afghan Hound", "African Bullfrog", "African Bush Elephant", "African Civet", "African Clawed Frog", "African Fish Eagle", "African Forest Elephant", "African Golden Cat", "African Grey Parrot", "African Jacana", "African Palm Civet", "African Penguin", "African Tree Toad", "African Wild Dog", "Africanized bee", "Agama Lizard", "Aidi", "Ainu", "Airedale Terrier", "Airedoodle", "Akbash", "Akita", "Akita Shepherd", "Alabai", "Alaskan Husky", "Alaskan Klee Kai", "Alaskan Malamute", "Alaskan Pollock", "Alaskan Shepherd", "Albacore Tuna", "Albatross", "Albertonectes", "Albino Corn Snake", "Aldabra Giant Tortoise", "Alligator Gar", "Allosaurus", "Alpaca", "Alpine Dachsbracke", "Alpine Goat", "Alusky", "Amano Shrimp", "Amargasaurus", "Amazon Parrot", "Amazon River Dolphin", "Amazon Tree Boa", "Amazonian Royal Flycatcher", "Ambrosia Beetle", "American Alligator", "American Alsatian", "American Bulldog", "American Bully", "American Cocker Spaniel", "American Cockroach", "American Coonhound", "American Dog Tick", "American Eel", "American Eskimo Dog", "American Foxhound", "American Hairless Terrier", "American Leopard Hound", "American Paddlefish", "American Pit Bull Terrier", "American Pugabull", "American Pygmy Goat", "American Robin", "American Staffordshire Terrier", "American Toad", "American Water Spaniel", "American Wirehair", "Amethystine Python", "Amphicoelias Fragillimus", "Amur Leopard", "Anaconda", "Anatolian Shepherd Dog", "Anchovies", "Andrewsarchus", "Angelfish", "Angelshark", "Angled Sunbeam Caterpillar", "Anglerfish", "Angora Ferret", "Angora Goat", "Anhinga", "Anna’s Hummingbird", "Anole Lizard", "Anomalocaris", "Ant", "Antarctic scale worm", "Anteater", "Antelope", "Anteosaurus", "Ape", "Apennine Wolf", "Appenzeller Dog", "Apple Head Chihuahua", "Apple Moth", "Arabian Cobra", "Arabian Wolf", "Arafura File Snake", "Arambourgiania", "Arapaima", "Archaeoindris", "Archaeopteryx", "Archaeotherium", "Archelon Turtle", "Archerfish", "Arctic Char", "Arctic Fox", "Arctic Hare", "Arctic Wolf", "Arctodus", "Arctotherium", "Argentavis Magnificens", "Argentinosaurus", "Arizona Bark Scorpion", "Arizona Black Rattlesnake", "Arizona Blonde Tarantula", "Arizona Coral Snake", "Armadillo", "Armadillo Lizard", "Armenian Gampr", "Armored Catfish", "Armyworm", "Arsinoitherium", "Arthropleura", "Aruba Rattlesnake", "Asian Arowana", "Asian Carp", "Asian Cockroach", "Asian Elephant", "Asian Giant Hornet", "Asian Lady Beetle", "Asian Longhorn Beetle", "Asian Palm Civet", "Asian Vine Snake", "Asian Water Monitor", "Asiatic Black Bear", "Asp", "Assassin Bug", "Assassin Snail", "Atlantic Salmon", "Atlantic Sturgeon", "Atlas Beetle", "Atlas Moth", "Aurochs", "Aussiedoodle", "Aussiedor", "Aussiepom", "Australian Bulldog", "Australian Cattle Dog", "Australian Cockroach", "Australian Flathead Perch", "Australian Gecko", "Australian Kelpie Dog", "Australian Labradoodle", "Australian Mist", "Australian Retriever", "Australian Shepherd", "Australian Terrier", "Australopithecus", "Avocet", "Axanthic Ball Python", "Axolotl", "Ayam Cemani", "Aye-aye", "Azawakh", "Babirusa", "Baboon", "Bactrian Camel", "Badger", "Baiji", "Baird’s Rat Snake", "Bald Eagle", "Baleen Whale", "Balinese", "Balkan Lynx", "Ball Python", "Bamboo Worms", "Banana Ball Python", "Banana Cinnamon Ball Python", "Banana Eel", "Banana Spider", "Banded Krait", "Banded Palm Civet", "Banded Water Snake", "Bandicoot", "Banjo Catfish", "Barb", "Barbet", "Barinasuchus", "Bark Beetle", "Bark Scorpion", "Barn Owl", "Barn Swallow", "Barnacle", "Barosaurus", "Barracuda", "Barramundi Fish", "Barred Owl", "Barreleye Fish", "Barylambda", "Basenji Dog", "Basilisk Lizard", "Basilosaurus", "Basking Shark", "Bass", "Bassador", "Basset Fauve de Bretagne", "Basset Hound", "Bassetoodle", "Bat", "Bat-Eared Fox", "Batfish", "Bavarian Mountain Hound", "Baya", "Bea-Tzu", "Beabull", "Beagador", "Beagle", "Beagle Shepherd", "Beaglier", "Beago", "Bear", "Bearded Collie", "Bearded Dragon", "Bearded Fireworm", "Bearded Vulture", "Beaski", "Beauceron", "Beauty rat snake", "Beaver", "Bed Bugs", "Bedlington Terrier", "Bee", "Bee-Eater", "Beefalo", "Beetle", "Belgian Canary", "Belgian Laekenois", "Belgian Malinois", "Belgian Sheepdog", "Belgian Shepherd", "Belgian Tervuren", "Belted Kingfisher", "Beluga Sturgeon", "Bengal Tiger", "Bergamasco", "Berger Blanc Suisse", "Berger Picard", "Bernedoodle", "Bernese Mountain Dog", "Bernese Shepherd", "Betta Fish", "Bhutan Takin", "Bichir", "Bichon Frise", "Bichpoo", "Biewer Terrier", "Bigfin Reef Squid ", "Bighorn Sheep", "Bilby", "Binturong", "Bird", "Bird Of Paradise", "Bird Snake", "Birman", "Biscuit Beetle", "Bismarck Ringed Python", "Bison", "Black And Tan Coonhound", "Black and White Warbler", "Black Dragon Lizard", "Black Mamba", "Black Marlin", "Black Mouth Cur", "Black Pastel Ball Python", "Black Rat Snake", "Black Rhinoceros", "Black Russian Terrier", "Black Tarantula", "Black Throat Monitor", "Black Wasp", "Black Widow Spider", "Black Witch Moth", "Black-Bellied Whistling Duck", "Black-Capped Chickadee", "Black-Footed Ferret", "Black-headed python", "Blacknose Shark", "Blackpoll Warbler", "Blacktip Reef Shark", "Bladefin Basslet", "Blanket Octopus", "Blind Snake", "Blister Beetle", "Blobfish", "Blood Python", "Bloodhound", "Blue Belly Lizard", "Blue Catfish", "Blue Death Feigning Beetle", "Blue Eyed Pleco", "Blue Gray Gnatcatcher", "Blue grosbeak", "Blue Iguana", "Blue Jay", "Blue Lacy Dog", "Blue Picardy Spaniel", "Blue Racer", "Blue Shark", "Blue Tanager", "Blue Tit", "Blue Whale", "Blue-Ringed Octopus", "Bluefin Tuna", "Bluegill", "Bluetick Coonhound", "Boas", "Bobcat", "Bobolink", "Boelen’s python", "Boerboel", "Boggle", "Boglen Terrier", "Boiga", "Bolivian Anaconda", "Bolognese Dog", "Bombay", "Bongo", "Bonito Fish", "Bonnethead Shark", "Bonobo", "Booby", "Boomslang", "Borador", "Border Collie", "Border Terrier", "Bordoodle", "Borkie", "Bornean Orang-utan", "Borneo Elephant", "Boston Terrier", "Bottlenose Dolphin", "Bouvier Des Flandres", "Bowfin", "Bowhead Whale", "Box Tree Moth", "Box Turtle", "Boxachi", "Boxador", "Boxer Dog", "Boxerdoodle", "Boxfish", "Boxsky", "Boxweiler", "Boykin Spaniel", "Bracco Italiano", "Brachiosaurus", "Brahminy Blindsnake", "Braque Francais", "Brazilian Black Tarantula", "Brazilian Terrier", "Brazilian Treehopper", "Bredl’s Python", "Briard", "British Timber", "Brittany", "Brontosaurus", "Bronze Whaler Shark", "Bronze-winged Jacana", "Brook Trout", "Brookesia Micra", "Brown Bear", "Brown Dog Tick", "Brown Headed Cowbird", "Brown Hyena", "Brown Snake", "Brown Tree Snake", "Brown Water Snake", "Brown-banded Cockroach", "Brug", "Brussels Griffon", "Budgerigar", "Buffalo", "Buffalo Fish", "Bull and Terrier", "Bull Shark", "Bull Terrier", "Bull Trout", "Bulldog", "Bulldog Mix", "Bullfrog", "Bullmastiff", "Bullsnake", "Bumblebee", "Burmese", "Burmese Python", "Burrowing Frog", "Burrowing Owl", "Bush Baby", "Bush Viper", "Bushmaster Snake", "Butterfly", "Butterfly Fish", "Cabbage Moth", "Cactus Moth", "Cactus Mouse", "Cactus Wren", "Caecilian", "Caiman", "Caiman Lizard", "Cairn Terrier", "California Condor", "California Kingsnake", "California Tarantula", "Camel", "Camel Cricket", "Camel Spider", "Canaan Dog", "Canada Lynx", "Canada Warbler", "Canadian Eskimo Dog", "Canadian Horse", "Cane Corso", "Cantil", "Cape Lion", "Capybara", "Caracal", "Cardinal", "Caribbean Reef Shark", "Caribou", "Carolina Dog", "Carolina Parakeet", "Carp", "Carpenter Ant", "Carpet Python", "Carpet Viper", "Cascabel", "Cashmere Goat", "Cassowary", "Cat", "Cat Snake", "Cat-Eyed Snake", "Catahoula Bulldog", "Catahoula Leopard", "Catalan Sheepdog", "Caterpillar", "Catfish", "Caucasian Mountain Dog", "Caucasian Shepherd", "Cava Tzu", "Cavador", "Cavalier King Charles Spaniel", "Cavapoo", "Cave Bear", "Cave Lion", "Cecropia Moth", "Cedar Waxwing", "Centipede", "Central Ranges Taipan", "Cephalaspis", "Ceratosaurus", "Cervalces latifrons", "Cesky Fousek", "Cesky Terrier", "Chameleon", "Chamois", "Chartreux", "Cheagle", "Checkered Garter Snake", "Cheetah", "Chesapeake Bay Retriever", "Chestnut-Sided Warbler", "Chi Chi", "Chickadee", "Chicken", "Chicken Snake", "Chigger", "Chihuahua", "Children’s python", "Chilean Rose Tarantula", "Chimaera", "Chimpanzee", "Chinchilla", "Chinese Alligator", "Chinese Cobra", "Chinese Crested Dog", "Chinese Geese", "Chinese Paddlefish", "Chinese Shar-Pei", "Chinese Water Deer", "Chinook", "Chinook Salmon", "Chinstrap Penguin", "Chipit", "Chipmunk", "Chipoo", "Chipping Sparrow", "Chiton", "Chiweenie", "Chorkie", "Chow Chow", "Chow Pom", "Chow Shepherd", "Christmas Beetle", "Christmas Island Red Crab", "Chusky", "Cicada", "Cichlid", "Cinereous Vulture", "Cinnamon Ball Python", "Cinnamon Bear", "Cinnamon Ferret", "Clark’s Grebe", "Click Beetle", "Clock Spider", "Clothes Moth", "Clouded Leopard", "Clownfish", "Clumber Spaniel", "Coachwhip Snake", "Coastal Carpet Python", "Coastal Taipan", "Coati", "Cobia Fish", "Cobras", "Cockalier", "Cockapoo", "Cockatiel", "Cockatoo", "Cocker Spaniel", "Cockle", "Cockroach", "Codfish", "Codling Moth", "Coelacanth", "Collared Peccary", "Collett’s Snake", "Collie", "Colossal Squid", "Comb Jellyfish", "Comb-crested Jacana", "Comet Moth", "Comfort Retriever", "Common Buzzard", "Common Carp", "Common European Adder", "Common Frog", "Common Furniture Beetle", "Common Grackle", "Common Green Magpie", "Common House Spider", "Common Loon", "Common Raven", "Common Toad", "Common Yellowthroat", "Compsognathus", "Cone Snail", "Conger Eel", "Congo Snake", "Conure", "Cookiecutter Shark", "Cooper’s Hawk", "Copperhead", "Coral", "Coral Snake", "Corella", "Corgidor", "Corgipoo", "Corkie", "Corman Shepherd", "Corn Rex Cat", "Corn Snake", "Cory Catfish", "Coryphodon", "Costa’s Hummingbird", "Coton de Tulear", "Cotton-top Tamarin", "Cottonmouth", "Cougar", "Cow", "Coyote", "Crab", "Crab Spider", "Crab-Eating Macaque", "Crabeater Seal", "Crane", "Crappie Fish", "Crayfish", "Crested Gecko", "Crested Penguin", "Cricket", "Croatian Sheepdog", "Crocodile", "Crocodile Monitor", "Cross Fox", "Cross River Gorilla", "Crow", "Crucian Carp", "Cryolophosaurus", "Cuban Boa", "Cuban Cockroach", "Cuckoo", "Curly Coated Retriever", "Curly Hair Tarantula", "Cuscus", "Cuttlefish", "Czechoslovakian Wolfdog", "Dachsador", "Dachshund", "Daeodon", "Dalmadoodle", "Dalmador", "Dalmatian", "Dandie Dinmont Terrier", "Daniff", "Danios", "Danish Swedish Farmdog", "Dapple Dachshund", "Dark-Eyed Junco", "Darkling Beetle", "Darwin’s fox", "Darwin’s Frog", "Daug", "De Brazza’s Monkey", "De Kay’s Brown Snake", "Death Adder", "Death’s Head Cockroach", "Deathwatch Beetle", "Decorator Crab", "Deer", "Deer Head Chihuahua", "Deer Tick", "Deinocheirus", "Deinosuchus", "Desert Ghost Ball Python", "Desert Kingsnake", "Desert Locust", "Desert Rain Frog", "Desert Tortoise", "Desert Wolf", "Desmostylus", "Deutsche Bracke", "Devil’s Coach Horse Beetle", "Devon Rex", "Dhole", "Diamond python", "Diamondback Moth", "Dickinsonia", "Dik-Dik", "Dilophosaurus", "Dimetrodon", "Dingo", "Dinocrocuta", "Dinofelis", "Dinopithecus", "Dinosaur Shrimp", "Dinosaurs", "Diplodocus", "Diprotodon", "Dire Wolf", "Discus", "Doberman Pinscher", "Dobsonfly", "Dodo", "Doedicurus", "Dog", "Dog Tick", "Dogo Argentino", "Dogue De Bordeaux", "Dolphin", "Donkey", "Dorgi", "Dorkie", "Dormouse", "Double Doodle", "Douc", "Downy Woodpecker", "Doxiepoo", "Doxle", "Draco Volans Lizard", "Dragon Eel", "Dragonfish", "Dragonfly", "Dreadnoughtus", "Drever", "Drum Fish", "Dubia Cockroach", "Duck", "Dugong", "Dumeril’s Boa", "Dung Beetle", "Dungeness Crab", "Dunker", "Dunkleosteus", "Dunnock", "Dusky Dolphin", "Dusky Shark", "Dutch Rabbit", "Dutch Shepherd", "Dwarf Boa", "Dwarf Crocodile", "Dwarf Hamster", "Eagle", "Eagle Ray", "Eared Grebe", "Earless Monitor Lizard", "Earthworm", "Earwig", "East Siberian Laika", "Eastern Barred Bandicoot", "Eastern Bluebird", "Eastern Box Turtle", "Eastern Brown Snake", "Eastern Chipmunk", "Eastern Coral Snake", "Eastern Diamondback Rattlesnake", "Eastern Dobsonfly", "Eastern Fence Lizard", "Eastern Glass Lizard", "Eastern Gorilla", "Eastern Gray Squirrel", "Eastern Green Mamba", "Eastern Hognose Snake", "Eastern Indigo Snake", "Eastern Kingbird", "Eastern Lowland Gorilla", "Eastern Meadowlark", "Eastern Phoebe", "Eastern Racer", "Eastern Rat snake", "Eastern Tiger Snake", "Eastern Turkey", "Eastern Woodrat", "Echidna", "Eclectus Parrot", "Edible Frog", "Eel", "Eel catfish", "Egret", "Egyptian Cobra", "Egyptian Goose", "Egyptian Mau", "Egyptian Tortoise", "Egyptian Vulture", "Eider", "Eland", "Elasmosaurus", "Elasmotherium", "Electric Catfish", "Electric Eel", "Elegant Tern", "Elephant", "Elephant Beetle", "Elephant Bird", "Elephant Fish", "Elephant Seal", "Elephant Shrew", "Elf Owl", "Elk", "Ember Tetra", "Embolotherium", "Emerald Toucanet", "Emerald Tree Boa", "Emerald Tree Monitor", "Emperor Angelfish", "Emperor Goose", "Emperor Penguin", "Emperor Tamarin", "Emu", "Enchi Ball Python", "English Bulldog", "English Cocker Spaniel", "English Cream Golden Retriever", "English Crested Guinea Pig", "English Foxhound", "English Longhorn Cattle", "English Pointer", "English Setter", "English Shepherd", "English Springer Spaniel", "English Toy Terrier", "Entlebucher Mountain Dog", "Epagneul Pont Audemer", "Epicyon haydeni", "Epidexipteryx", "Equatorial Spitting Cobra", "Equus giganteus", "Ermine", "Eryops", "Escolar", "Eskimo Dog", "Eskipoo", "Estrela Mountain Dog", "Euoplocephalus", "Eurasian Beaver", "Eurasian Bullfinch", "Eurasian Collared Dove", "Eurasian Jay", "Eurasian Lynx", "Eurasian Nuthatch", "Eurasian Sparrowhawk", "Eurasian Wolf", "Eurasier", "European Bee-Eater", "European Corn Borer", "European Goldfinch", "European Polecat", "European Robin", "European Starling", "European Wildcat", "Eurypterus", "Evening Bat", "Evening Grosbeak", "Executioner Wasp ", "Eyelash Viper", "Fairy-Wren", "Falcon", "Fallow deer", "False Cobra", "False coral snake", "False Killer Whale", "False Water Cobra", "False Widow Spider", "Fangtooth", "Feist", "Fennec Fox", "Fer-de-lance Snake", "Ferret", "Ferruginous Hawk", "Fiddler Crab", "Field Spaniel", "Fierce Snake", "Figeater Beetle", "Fila Brasileiro", "Fin Whale", "Finnish Lapphund", "Finnish Spitz", "Fire Ball Python", "Fire Eel", "Fire salamander", "Fire-Bellied Toad", "Firefly", "Firefly Ball Python", "Fish", "Fisher Cat", "Fishing Cat", "Flamingo", "Flat-Coated Retriever", "Flathead Catfish", "Flea", "Flea Beetle", "Fleckvieh Cattle", "Florida Gar", "Florida Panther", "Florida Woods Cockroach", "Flounder", "Flounder Fish", "Flour Beetle", "Flowerhorn Fish", "Fluke Fish", "Fly", "Flycatcher", "Flying Fish", "Flying Lemur", "Flying Snake", "Flying Squirrel", "Football Fish", "Forest Cobra", "Formosan Mountain Dog", "Fossa", "Fox", "Fox Snakes", "Fox Squirrel", "Fox Terrier", "Freeway Ball Python", "French Bulldog", "French Lop", "Frenchton", "Frengle", "Freshwater Crocodile", "Freshwater Eel", "Freshwater Jellyfish", "Freshwater Sunfish", "Frigatebird", "Frilled Lizard", "Frilled Shark", "Fritillary Butterfly", "Frog", "Frogfish", "Frug", "Fruit Bat", "Fruit Fly", "Fulvous Whistling Duck", "Fur Seal", "Gaboon Viper", "Galapagos Penguin", "Galapagos Shark", "Galapagos Tortoise", "Gar", "Garden Eel", "Garden Spider", "Gargoyle Gecko", "Garter Snake", "Gastornis", "Gazelle", "Gecko", "Genet", "Gentoo Penguin", "Geoffroys Tamarin", "Gerberian Shepsky", "Gerbil", "German Cockroach", "German Longhaired Pointer", "German Pinscher", "German Shepherd Guide", "German Sheppit", "German Sheprador", "German Shorthaired Pointer", "German Spitz", "German Wirehaired Pointer", "Gharial", "Ghost Catfish", "Ghost Crab", "Giant African Land Snail", "Giant Armadillo", "Giant Beaver", "Giant Clam", "Giant Desert Centipede", "Giant House Spider", "Giant Isopod", "Giant Leopard Moth", "Giant Panda Bear", "Giant Salamander", "Giant Schnauzer", "Giant Schnoodle", "Giant Weta", "Gibbon", "Gigantopithecus", "Gila Monster", "Giraffe", "Glass Frog", "Glass Lizard", "Glechon", "Glen Of Imaal Terrier", "Glow Worm", "Gnat", "Goat", "Goberian", "Goblin Shark", "Goby Fish", "Goldador", "Goldcrest", "Golden Dox", "Golden Eagle", "Golden Irish", "Golden Lancehead", "Golden Lion Tamarin", "Golden Masked Owl", "Golden Newfie", "Golden Oriole", "Golden Pyrenees", "Golden Retriever", "Golden Saint", "Golden Shepherd", "Golden Tortoise Beetle", "Golden-Crowned Flying Fox", "Golden-Crowned Kinglet", "Goldendoodle", "Goldfish", "Goliath Beetle", "Goliath Frog", "Goliath Tigerfish", "Gollie", "Gomphotherium", "Goonch Catfish", "Goose", "Gooty Sapphire Tarantula", "Gopher", "Gopher Snake", "Gopher Tortoise", "Gordon Setter", "Gorgosaurus", "Gorilla", "Goshawk", "Gouldian Finch", "Grapevine Beetle", "Grass Carp", "Grass Snake", "Grass Spider", "Grasshopper", "Grasshopper Mouse", "Gray Catbird", "Gray Fox", "Gray Tree Frog", "Great Blue Heron", "Great Crested Flycatcher", "Great Dane", "Great Danoodle", "Great Egret", "Great Hammerhead Shark", "Great Kiskadee", "Great Plains Rat Snake", "Great Potoo Bird", "Great Pyrenees", "Great White Shark", "Greater Swiss Mountain Dog", "Grebe", "Green Anaconda", "Green Anole", "Green Aphids", "Green Bee-Eater", "Green Bottle Blue Tarantula", "Green Frog", "Green Heron", "Green Mamba", "Green Rat Snake", "Green Snake", "Green Sunfish", "Green Tree Frog", "Green Tree Python", "Greenland Dog", "Greenland Shark", "Grey Heron", "Grey Mouse Lemur", "Grey Reef Shark", "Grey Seal", "Greyhound", "Griffon Vulture", "Griffonshire", "Grizzly Bear", "Groenendael", "Ground Snake", "Groundhog", "Grouper", "Grouse", "Guinea Fowl", "Guinea Pig", "Gulper Catfish ", "Gulper Eel ", "Guppy", "Gypsy Moth", "Haast’s Eagle", "Habu Snake", "Haddock", "Hagfish", "Haikouichthys", "Hainosaurus", "Hairy Frogfish", "Hairy Woodpecker", "Halibut", "Hallucigenia", "Hamburg Chicken", "Hammerhead Shark", "Hamster", "Harbor Seal", "Hardhead Catfish", "Hare", "Harlequin Rabbit", "Harlequin Snake", "Harp Seal", "Harpy Eagle", "Harrier", "Harris Hawk", "Hatzegopteryx", "Havamalt", "Havanese", "Havapoo", "Havashire", "Havashu", "Hawaiian Crow", "Hawaiian Goose", "Hawaiian Monk Seal", "Hawk", "Hawk Moth Caterpillar", "Hedgehog", "Helicoprion", "Hellbender", "Hepatic Tanager", "Hercules Beetle", "Hercules Moth", "Hermit Crab", "Heron", "Herrerasaurus", "Herring", "Herring Gull", "Highland Cattle", "Himalayan", "Hippopotamus", "Hippopotamus gorgops", "Hoary Bat", "Hobo Spider", "Hognose snake", "Hokkaido", "Holy Cross Frog", "Honduran White Bat", "Honey Badger", "Honey Bee", "Honey Buzzard", "Hooded Oriole", "Hooded Seal", "Hook-Nosed Sea Snake", "Hoopoe", "Horgi", "Horn Shark", "Hornbill", "Horned Adder", "Horned Beetle", "Horned Frog", "Horned Grebe", "Horned Lizard", "Horned Viper", "Hornet", "Horse", "Horse Mackerel", "Horsefly", "Horseshoe Crab", "Houdan Chicken", "House Finch", "House Sparrow", "House wren", "Housefly", "Hovasaurus", "Hovawart", "Howler Monkey", "Human", "Humboldt Penguin", "Humboldt Squid", "Hummingbird", "Hummingbird Hawk-Moth", "Humpback Whale", "Huntaway", "Huntsman Spider", "Huskador", "Huskita", "Husky", "Husky Jack", "Huskydoodle", "Hyacinth Macaw", "Hyaenodon", "Hyena", "Ibex", "Ibis", "Ibizan Hound", "Icadyptes", "Icelandic Sheepdog", "Ichthyosaurus", "Ichthyostega", "Iguana", "Iguanodon", "IMG Boa Constrictor", "Immortal Jellyfish", "Impala", "Imperial Moth", "Indian Cobra", "Indian Elephant", "Indian Giant Squirrel", "Indian Palm Squirrel", "Indian python", "Indian Rhinoceros", "Indian Star Tortoise", "Indianmeal Moth", "Indigo Snake", "Indochinese Tiger", "Indri", "Inland Taipan", "Insect", "Insects", "IO Moth", "Irish Doodle", "Irish Elk", "Irish Setter", "Irish Terrier", "Irish Water Spaniel", "Irish WolfHound", "Italian Greyhound", "Ivory-billed woodpecker", "Jabiru", "Jacana", "Jack Russell", "Jack-Chi", "Jackabee", "Jackal", "Jackdaw", "Jackrabbit", "Jackson’s Chameleon", "Jagdterrier", "Jaguar", "Jaguarundi Cat", "Jamaican Boa", "Jamaican Iguana", "Japanese Bantam Chicken", "Japanese Beetle", "Japanese Chin", "Japanese Macaque", "Japanese rat snake", "Japanese Spitz", "Japanese Squirrel", "Japanese Terrier", "Javan Leopard", "Javan Rhinoceros", "Javanese", "Jellyfish", "Jerboa", "Jewel Beetle ", "John Dory", "Jonah Crab", "Joro Spider", "Josephoartigasia monesi", "Jumping Spider", "Jungle Carpet Python", "Junglefowl", "Kagu", "Kai Ken", "Kakapo", "Kaluga Sturgeon", "Kangal Shepard Dog", "Kangaroo", "Kangaroo Mouse", "Kangaroo Rat", "Katydid", "Kaua’i ‘Ō‘ō", "Kea", "Keagle", "Keel-Billed Toucan", "Keelback", "Keeshond", "Kelp Greenling", "Kentucky Warbler", "Kenyan Sand Boa", "Kermode Bear", "Kerry Blue Terrier", "Kestrel", "Keta Salmon", "Key Deer", "Khao Manee", "Kiko Goat", "Killdeer", "Killer Clown Ball Python", "Killer Whale", "Killifish", "Kinabalu Giant Red Leech", "Kinder Goat", "King Cobra", "King Crab", "King Eider", "King Penguin", "King Quail", "King Rat Snake", "King Salmon", "King Shepherd", "King Snake", "King Vulture", "Kingfisher", "Kinkajou", "Kirtland’s snake", "Kishu", "Kissing Bugs", "Kit Fox", "Kitefin Shark", "Kiwi", "Klipspringer", "Knifefish", "Knight Anole", "Koala", "Kodiak Bear", "Kodkod", "Koi Fish", "Kokanee Salmon", "Komodo Dragon", "Komondor", "Kooikerhondje", "Kookaburra", "Koolie", "Korean Jindo", "Kori Bustard", "Kouprey", "Kowari", "Krait", "Krill", "Kudu", "Kudzu Bug", "Kuvasz", "Labahoula", "Labmaraner", "Labout’s Fairy Wrasse", "Labrabull", "Labradane", "Labradoodle", "Labrador Retriever", "Labraheeler", "Labrottie", "Lace Bug", "Lace Monitor", "Ladybug", "Ladyfish", "Lagotto Romagnolo", "Lake Sturgeon", "Lakeland Terrier", "LaMancha Goat", "Lamprey", "Lancashire Heeler", "Lancetfish", "Landseer Newfoundland", "Lappet-faced Vulture", "Lapponian Herder", "Larder Beetle", "Large Munsterlander", "Lavender Albino Ball Python", "Lawnmower Blenny", "Lazarus Lizard", "Leaf-Tailed Gecko", "Leatherback Sea Turtle", "Leech", "Leedsichthys", "Leichhardt’s Grasshopper", "Lemming", "Lemon Blast Ball Python", "Lemon Shark", "Lemur", "Leonberger", "Leopard", "Leopard Cat", "Leopard Frog", "Leopard Gecko", "Leopard Lizard", "Leopard Seal", "Leopard Shark", "Leopard Tortoise", "Leptocephalus", "Lesser Jacana", "Lhasa Apso", "Lhasapoo", "Liger", "Limpet", "Lineback Cattle", "Linnet", "Lion", "Lion’s Mane Jellyfish", "Lionfish", "Liopleurodon", "Little Brown Bat", "Little Penguin", "Livyatan", "Lizard", "Lizardfish", "Llama", "Loach", "Lobster", "Locust", "Lone Star Tick", "Long-Eared Owl", "Long-Haired Rottweiler", "Long-Tailed Tit", "Longfin Mako Shark", "Longnose Gar", "Lorikeet", "Loris", "Lowchen", "Lumpfish", "Lungfish", "Lurcher", "Lykoi Cat", "Lynx", "Lyrebird", "Lystrosaurus", "Macaque", "Macaroni Penguin", "Macaw", "Machaeroides", "Mackenzie Wolf", "Macrauchenia", "Madagascar Hissing Cockroach", "Madagascar Jacana", "Madagascar Tree Boa", "Madora Moth", "Magellanic Penguin", "Maggot", "Magnolia Warbler", "Magpie", "Magyarosaurus", "Mahi Mahi", "Maiasaura", "Maine Coon", "Mal Shi", "Malayan Civet", "Malayan Krait", "Malayan Tiger", "Malchi", "Mallard", "Malteagle", "Maltese", "Maltese Shih Tzu", "Maltipom", "Maltipoo", "Mamba", "Mamushi Snake", "Man of War Jellyfish", "Manatee", "Manchester Terrier", "Mandarin Rat Snake", "Mandrill", "Maned Wolf", "Mangrove Snake", "Manta Ray", "Mantella Frog", "Marabou Stork", "Marble Fox", "Maremma Sheepdog", "Marine Iguana", "Marine Toad", "Markhor", "Marmoset", "Marmot", "Marsh Frog", "Marsican Brown Bear", "Masiakasaurus", "Masked Angelfish", "Masked Palm Civet", "Massasauga", "Mastador", "Mastiff", "Mauzer", "May Beetle", "Mayfly", "Meagle", "Mealworm Beetle", "Mealybug", "Meerkat", "Megalania", "Megalochelys", "Megalodon", "Megamouth Shark", "Meganeura", "Megatherium", "Meiolania", "Mekong Giant Catfish", "Merganser", "Mexican Alligator Lizard", "Mexican Black Kingsnake", "Mexican Eagle", "Mexican Fireleg Tarantula", "Mexican Free-Tailed Bat", "Mexican Mole Lizard", "Microraptor", "Midget Faded Rattlesnake", "Miki", "Milk Snake", "Milkfish", "Millipede", "Mini Labradoodle", "Mini Lop", "Miniature Bull Terrier", "Miniature Husky", "Miniature Pinscher", "Mink", "Minke Whale", "Mississippi Kite", "Moccasin Snake", "Modern Game Chicken", "Mojarra", "Mojave Ball Python", "Mojave Rattlesnake", "Mola mola", "Mole", "Mole Crab", "Mole Cricket", "Mole Snake", "Molly", "Monarch Butterfly", "Mongoose", "Mongrel", "Monitor Lizard", "Monkey", "Monkfish", "Monocled Cobra", "Monte Iberia Eleuth", "Moon Jellyfish", "Moonglow Boa", "Moorhen", "Moose", "Moray Eel", "Morkie", "Mosasaurus", "Moscow Watchdog", "Mosquito", "Moth", "Mountain Bluebird", "Mountain Cur", "Mountain Feist", "Mountain Gorilla", "Mountain Lion", "Mourning Dove", "Mouse", "Mozambique Spitting Cobra", "Mud Snake", "Mudi", "Mudpuppy", "Mule", "Mule Deer", "Mulga Snake", "Mullet Fish", "Muntjac", "Muscovy Duck", "Musk Deer", "Muskox", "Muskrat", "Mussurana Snake", "Muttaburrasaurus", "Myna Bird", "Nabarlek", "Naegleria", "Naked Mole Rat", "Narwhal", "Natterjack", "Nautilus", "Neanderthal", "Neapolitan Mastiff", "Nebelung", "Needlefish", "Nelore Cattle", "Neon Tetra", "Neptune Grouper", "Newfoundland", "Newfypoo", "Newt", "Nguni Cattle", "Nicobar pigeon", "Nigerian Goat", "Night Adder", "Night Heron", "Night Snake", "Nightingale", "Nightjar", "Nile Crocodile", "Nilgai", "No See Ums", "Norfolk Terrier", "Norrbottenspets", "North American Black Bear", "Northern Alligator Lizard", "Northern Cardinal", "Northern Flicker", "Northern Fur Seal", "Northern Harrier", "Northern Inuit Dog", "Northern Jacana", "Northern Parula", "Northern Potoo", "Northern Screamer", "Northern Water Snake", "Norway Rat", "Norwegian Buhund", "Norwegian Elkhound", "Norwegian Forest", "Norwegian Lundehund", "Norwich Terrier", "Nose-horned viper", "Nova Scotia Duck Tolling Retriever", "Nubian Goat", "Nudibranch", "Numbat", "Nuralagus", "Nurse Shark", "Nut Weevil", "Nuthatch", "Nutria", "Nyala", "Oak Toad", "Oarfish", "Ocean Whitefish", "Oceanic Whitetip Shark", "Ocellated Turkey", "Ocelot", "Octopus", "Oenpelli python", "Okapi", "Old English Sheepdog", "Old House Borer", "Oleander Hawk Moth", "Olingo", "Olive Baboon", "Olive python", "Olive Sea Snake", "Olm", "Onagadori Chicken", "Onager", "Opabinia", "Opah", "Opossum", "Oranda Goldfish", "Orang-utan", "Orange Baboon Tarantula", "Orange Dream Ball Python", "Orange Roughy ", "Orange Tanager", "Orange-Crowned Warbler", "Orb Weaver", "Orchard Oriole", "Oregon Spotted Frog", "Ori-Pei", "Oribi", "Oriental Cockroach", "Oriental Dwarf Kingfisher", "Orinoco Crocodile", "Ornate Box Turtle", "Ornithocheirus", "Ornithomimus", "Ortolan Bunting", "Oscar Fish", "Osprey", "Ostracod", "Ostrich", "Otter", "Otterhound", "Ovenbird", "Oviraptor", "Owl", "Owl Butterfly", "Ox", "Oxpecker", "Oyster", "Oyster Toadfish", "Ozark Bass", "Pachycephalosaurus", "Pacific Sleeper Shark", "Paddlefish", "Pademelon", "Painted Turtle", "Palaeoloxodon namadicus", "Paleoparadoxia", "Palm Rat", "Palo Verde Beetle", "Panda Pied Ball Python", "Pangolin", "Panther", "Panthera atrox", "Papillon", "Paradise Flying Snake", "Parakeet", "Parasaurolophus", "Parrot", "Parrot Snake", "Parrotfish", "Parrotlet", "Parson Russell Terrier", "Parti Schnauzer", "Partridge", "Patagotitan", "Patas Monkey", "Patterdale Terrier", "Pea Puffer", "Peacock", "Peacock Butterfly", "Peacock Spider", "Peagle", "Peekapoo", "Pekingese", "Pelagornis", "Pelagornithidae", "Pelican", "Pelycosaurs", "Pembroke Welsh Corgi", "Penguin", "Pennsylvania Wood Cockroach", "Peppered Moth", "Peppermint Angelfish", "Perch Fish", "Pere Davids Deer", "Peregrine Falcon", "Peringuey’s Adder", "Perro De Presa Canario", "Persian", "Peruvian Guinea Pig", "Peruvian Inca Orchid", "Pesquet’s Parrot", "Petit Basset Griffon Vendéen", "Petite Goldendoodle", "Pharaoh Hound", "Pheasant", "Pheasant-tailed Jacana", "Philippine Cobra", "Phoenix Chicken", "Phorusrhacos", "Phytosaurs", "Picardy Spaniel", "Pictus Catfish", "Piebald Dachshund", "Pied Ball Python", "Pied Tamarin", "Pied-Billed Grebe", "Pig", "Pigeon", "Pika", "Pike Fish", "Pileated Woodpecker", "Pinacate Beetle", "Pine Beetle", "Pine Marten", "Pine Siskin", "Pine Snake", "Pink Fairy Armadillo", "Pink Salmon", "Pink Toed Tarantula", "Pink-Necked Green Pigeon", "Pipe Snake", "Pipefish", "Piranha", "Pit Bull", "Pit Viper", "Pitador", "Pitsky", "Plains Hognose Snake", "Platinum Arowana", "Platybelodon", "Platypus", "Plesiosaur", "Pliosaur", "Plott Hounds", "Pocket Beagle", "Pocket Pitbull", "Podenco Canario", "Pointer", "Poison Dart Frog", "Polacanthus", "Polar Bear", "Polecat", "Polish Lowland Sheepdog", "Polish Tatra Sheepdog", "Polka Dot Stingray", "Pollock Fish", "Polyphemus moth", "Pomapoo", "Pomchi", "Pomeagle", "Pomeranian", "Pomsky", "Pond Skater", "Poochon", "Poodle", "Poogle", "Pool Frog", "Porbeagle Shark", "Porcupine", "Porpoise", "Portuguese Podengo", "Possum", "Potoo", "Potoroo", "Powderpost Beetle", "Prairie Chicken", "Prairie Dog", "Prairie Rattlesnake", "Prawn", "Praying Mantis", "Proboscis Monkey", "Procoptodon", "Pronghorn", "Psittacosaurus", "Pteranodon", "Pterodactyl", "Pudelpointer", "Puff Adder", "Pufferfish", "Puffin", "Pug", "Pugapoo", "Puggle", "Pugshire", "Puli", "Puma", "Pumi", "Pumpkin Patch Tarantula", "Purple Emperor Butterfly", "Purple Finch", "Purple Gallinule", "Purple Tarantula", "Purussaurus", "Puss Moth", "Pygmy Hippopotamus", "Pygmy Marmoset", "Pygmy python", "Pygmy Shark", "Pygora Goat", "Pyjama Shark", "Pyrador", "Pyredoodle", "Pyrenean Mastiff", "Pyrenean Shepherd", "Python", "Quagga", "Quail", "Queen snake", "Quetzal", "Quetzalcoatlus northropi", "Quokka", "Quoll", "Rabbit", "Raccoon", "Raccoon Dog", "Racer Snake", "Radiated Tortoise", "Ragamuffin", "Ragdoll", "Raggle", "Rainbow Boa", "Rainbow Kribs", "Rainbow Shark", "Rat", "Rat Snakes", "Rat Terrier", "Rattlesnake", "Red Ackie Monitor", "Red Aphids", "Red Deer", "Red Diamondback Rattlesnake", "Red Finch", "Red Fox", "Red Kite", "Red Knee Tarantula", "Red Panda", "Red Paper Wasp", "Red Racer Snake", "Red Spitting Cobra", "Red Squirrel", "Red Tail Boa", "Red Wolf", "Red-Bellied Black Snake", "Red-Bellied Woodpecker", "Red-Billed Quelea Bird", "Red-Eared Slider", "Red-Eyed Tree Frog", "Red-Footed Tortoise", "Red-handed Tamarin", "Red-Headed Vulture", "Red-Lipped Batfish", "Red-Shouldered Hawk", "Red-winged blackbird", "Redback Spider", "Redbone Coonhound", "Redhump Eartheater", "Redstart", "Redtail Catfish", "Reef Shark", "Reindeer", "Repenomamus", "Reticulated python", "Rex Rabbit", "Rhamphosuchus", "Rhea", "Rhesus Macaque", "Rhino Beetle", "Rhino Viper", "Rhinoceros", "Rhodesian Ridgeback", "Rhombic Egg-Eater Snake", "Ribbon Eel", "Ribbon Snake", "Rim Rock Crowned Snake", "Ring-billed Gull", "Ringed Kingfisher", "Rinkhals Snake", "River Otter", "River Turtle", "Roadrunner", "Robber Flies", "Robin", "Rock Crab", "Rock Hyrax", "Rock Python", "Rockfish", "Rockhopper Penguin", "Rodents", "Roe Deer", "Rooster", "Root Aphids", "Rose-breasted Grosbeak", "Roseate Spoonbill", "Rosy Boa", "Rotterman", "Rottsky", "Rottweiler", "Rough Earth Snake", "Rough Green Snake", "Rough-Legged Hawk", "Rove Beetle", "Royal Penguin", "Rubber Boa", "Ruby-Crowned Kinglet", "Ruby-Throated Hummingbird", "Ruddy Turnstone", "Rufous Hummingbird", "Russel’s Viper", "Russell Terrier", "Russian Bear Dog", "Russian Blue", "Russian Tortoise", "Saanen Goat", "Saarloos Wolfdog", "Saber-Toothed Tiger", "Sable", "Sable Black German Shepherd", "Sable Ferret", "Saddleback Caterpillar", "Saiga", "Saint Berdoodle", "Saint Bernard", "Saint Shepherd", "Salamander", "Salmon", "Salmon Shark", "Saluki", "Sambar", "Samoyed", "San Francisco Garter Snake", "Sand Cat", "Sand Crab", "Sand Dollar", "Sand Lizard", "Sand Tiger Shark", "Sand Viper", "Sandhill Crane", "Saola", "Sapsali", "Sarcosuchus", "Sardines", "Sarkastodon", "Sarplaninac", "Sarus Crane", "Satanic leaf-tailed gecko", "Saturniidae Moth", "Sauropoda", "Savanna Goat", "Savannah Monitor", "Savannah Sparrow", "Savu Python", "Saw-scaled viper", "Sawfish", "Scallops", "Scarab Beetle", "Scarlet Kingsnake", "Scarlet Macaw", "Scarlet Tanager", "Schapendoes", "Schipperke", "Schneagle", "Schnoodle", "Scimitar-horned Oryx", "Scorpion", "Scorpion Fish", "Scotch Collie", "Scottish Deerhound", "Scottish Fold Cat", "Scottish Terrier", "Scrotum Frog", "Sculpin", "Scutosaurus", "Sea Anemone", "Sea Dragon", "Sea Eagle", "Sea Lion", "Sea Otter", "Sea Roach", "Sea Slug", "Sea Snake", "Sea Squirt", "Sea Turtle", "Sea Urchin", "Seagull", "Seahorse", "Seal", "Sealyham Terrier", "Sedge Warbler", "Sei Whale", "Senegal Parrot", "Senepol Cattle", "Sequined Spider", "Serval", "Seymouria", "Shark", "Sharp-Shinned Hawk", "Sharp-Tailed Snake", "Shastasaurus", "Sheep", "Sheepadoodle", "Sheepshead Fish", "Shepadoodle", "Shepkita", "Shepweiler", "Shetland Sheepdog", "Shiba Inu", "Shichi", "Shih Poo", "Shih Tzu", "Shikoku", "Shiloh Shepherd", "Shiranian", "Shoebill Stork", "Shollie", "Short-Eared Owl", "Short-Faced Bear", "Shortfin Mako Shark", "Shrew", "Shrimp", "Siamese", "Siberian", "Siberian Husky", "Siberian Ibex", "Siberian Retriever", "Siberian Tiger", "Siberpoo", "Sidewinder", "Sika Deer", "Silken Windhound", "Silkie Chicken", "Silky Shark", "Silky Terrier", "Silver Dollar", "Silver Labrador", "Simbakubwa", "Sinosauropteryx", "Sivatherium", "Sixgill shark", "Skate Fish", "Skeleton Tarantula", "Skink Lizard", "Skipjack Tuna", "Skua", "Skunk", "Skye Terrier", "Sleeper Shark", "Sloth", "Slovak Cuvac", "Slow Worm", "Slug", "Smallmouth Bass", "Smilosuchus", "Smokybrown Cockroach", "Smooth Earthsnake", "Smooth Fox Terrier", "Smooth Green Snake", "Smooth Hammerhead Shark", "Smooth Snake", "Snail", "Snake", "Snapping Turtle", "Snook Fish", "Snorkie", "Snouted Cobra", "Snow Bunting", "Snow Crab", "Snow Leopard", "Snowberry Clearwing Moth", "Snowflake Eel", "Snowshoe", "Snowshoe Hare", "Snowy Owl", "Sockeye Salmon", "Soldier Beetle", "Somali", "Song Sparrow", "Song Thrush", "South China Tiger", "Southern Black Racer", "Southern Hognose Snake", "Southern Pacific Rattlesnake", "Spadefoot Toad", "Spanador", "Spanish Goat", "Spanish Mastiff", "Spanish Water Dog", "Sparrow", "Sparrowhawk", "Speckled Kingsnake", "Spectacled Bear", "Sperm Whale", "Sphynx", "Spider", "Spider Ball Python", "Spider Beetle", "Spider Monkey", "Spider Wasp", "Spider-Tailed Horned Viper", "Spinner Shark", "Spinone Italiano", "Spinosaurus", "Spiny bush viper", "Spiny Dogfish", "Spiny Hill Turtle", "Spitting Cobra", "Spixs Macaw", "Sponge", "Spongy Moth", "Spotted Gar", "Spotted Lanternfly", "Spotted python", "Spotted Skunk", "Springador", "Springbok", "Springerdoodle", "Squash Beetle", "Squid", "Squirrel", "Squirrel Monkey", "Squirrelfish", "Sri Lankan Elephant", "Stabyhoun", "Staffordshire Bull Terrier", "Stag Beetle", "Standard Schnauzer", "Star-nosed mole", "Starfish", "Stargazer Fish", "Steelhead Salmon", "Steller’s Sea Cow", "Stick Insect", "Stiletto Snake", "Stingray", "Stoat", "Stone Crab", "Stonechat", "Stonefish", "Stoplight Loosejaw", "Stork", "Strawberry Hermit Crab", "Striped Hyena", "Striped Rocket Frog", "Stupendemys", "Sturgeon", "Styracosaurus", "Suchomimus", "Sucker Fish", "Sugar Glider", "Sulcata Tortoise", "Sumatran Elephant", "Sumatran Orang-utan", "Sumatran Rhinoceros", "Sumatran Tiger", "Summer Tanager", "Sun Bear", "Sunbeam Snake", "Sunset Ball Python", "Super Pastel Ball Python", "Supersaurus", "Superworm", "Surgeonfish", "Swai Fish", "Swainson’s Hawk", "Swallow", "Swan", "Swedish Elkhound", "Swedish Lapphund", "Swedish Vallhund", "Swordfish", "Syrian Hamster", "Taco Terrier", "Tailless Whip Scorpion", "Taipan", "Takin", "Tamaskan", "Tang", "Tangerine Leopard Gecko", "Tapanuli Orang-utan", "Tapir", "Tarantula Hawk", "Tarbosaurus", "Tarpon", "Tarsier", "Tasmanian Devil", "Tasmanian Tiger", "Tasmanian Tiger Snake", "Tawny Frogmouth", "Tawny Owl", "Teacup Miniature Horse", "Teddy Bear Hamster", "Teddy Guinea Pig", "Teddy Roosevelt Terrier", "Telescope Fish", "Ten-Lined June Beetle", "Tennessee Walking Horse", "Tentacled Snake", "Tenterfield Terrier", "Termite", "Terrier", "Terror Bird", "Tetra", "Texas Blind Snake", "Texas Brown Tarantula", "Texas Coral Snake", "Texas Garter Snake", "Texas Heeler", "Texas Indigo Snake", "Texas Night Snake", "Texas Rat Snake", "Texas Spiny Lizard", "Thai Ridgeback", "Thalassomedon", "Thanatosdrakon", "Thornback Ray", "Thorny Devil", "Thresher Shark", "Thrush", "Thylacoleo", "Thylacoleo carnifex", "Thylacosmilus", "Tibetan Fox", "Tibetan Mastiff", "Tibetan Spaniel", "Tibetan Terrier", "Tick", "Tiffany", "Tiger", "Tiger Beetle", "Tiger Moth", "Tiger Rattlesnake", "Tiger Salamander", "Tiger Shark", "Tiger snake", "Timber Rattlesnake", "Timor python", "Tire Track Eel", "Titan Beetle", "Titanoboa", "Toadfish", "Tomato Hornworm", "Torkie", "Tornjak", "Tortoise", "Tosa", "Toucan", "Towhee", "Toxodon", "Toy Fox Terrier", "Toy Poodle", "Transylvanian Hound", "Trapdoor spider", "Tree Frog", "Tree Kangaroo", "Tree Snake", "Tree swallow", "Tree Viper", "Treecreeper", "Treeing Tennessee Brindle", "Treeing Walker Coonhound", "Triggerfish", "Troodon", "Tropicbird", "Trout", "Tsetse Fly", "Tuatara", "Tufted Coquette", "Tufted Titmouse", "Tully Monster", "Tuna", "Turaco", "Turkey", "Turkey Vulture", "Turkish Angora", "Turtles", "Tusoteuthis", "Twig Snake", "Tylosaurus", "Tyrannosaurus Rex", "Uakari", "Uguisu", "Uinta Ground Squirrel", "Uintatherium", "Umbrellabird", "Unau", "Underwing Moth", "Upland Sandpiper", "Ural owl", "Urechis unicinctus", "Urial", "Uromastyx", "Urutu Snake", "Utonagan", "Valley Bulldog", "Vampire Bat", "Vampire Crab ", "Vampire Squid", "Vaquita", "Vegavis", "Velociraptor", "Venus Flytrap", "Vermilion Flycatcher", "Vervet Monkey", "Vicuña", "Vine Snake", "Vinegaroon", "Viper", "Viper Boa", "Viper Shark", "Viperfish", "Virgin Islands Dwarf Gecko", "Vizsla", "Vole", "Volpino Italiano", "Vulture", "Wahoo Fish", "Waimanu", "Walking Catfish", "Wallaby", "Walleye Fish", "Walrus", "Wandering Albatross", "Warbler", "Warthog", "Wasp", "Water Beetle", "Water Buffalo", "Water Bug", "Water Dragon", "Water Vole", "Wattled Jacana", "Wax Moth", "Weasel", "Weaver Bird", "Weimaraner", "Weimardoodle", "Wels Catfish", "Welsh Black Cattle", "Welsh Corgi", "Welsh Springer Spaniel", "Welsh Terrier", "West Highland Terrier", "West Siberian Laika", "Western Blind Snake", "Western Diamondback Rattlesnake", "Western Gorilla", "Western Green Mamba", "Western Hognose Snake", "Western Lowland Gorilla", "Western Rat Snake", "Western Tanager", "Westiepoo", "Whale Shark", "Wheaten Terrier", "Whimbrel", "Whinchat", "Whippet", "Whiptail Lizard", "White Butterfly", "White Catfish", "White Ferret / Albino Ferrets", "White Rhinoceros", "White Shark", "White Sturgeon ", "White Tiger", "White-Crowned Sparrow", "White-Eyed Vireo", "White-Faced Capuchin", "White-shouldered House Moth", "White-tail deer", "White-Tailed Eagle", "Whitetail Deer", "Whiting", "Whoodle", "Whooping Crane", "Wild Boar", "Wildebeest", "Willow Warbler", "Winter Moth", "Wire Fox Terrier", "Wirehaired Pointing Griffon", "Wirehaired Vizsla", "Wiwaxia", "Wolf", "Wolf Eel", "Wolf Snake", "Wolf Spider", "Wolffish", "Wolverine", "Woma python", "Wombat", "Wood Bison", "Wood Frog", "Wood Tick", "Wood Turtle", "Woodlouse", "Woodlouse Spider", "Woodpecker", "Woodrat", "Woolly Aphids", "Woolly Mammoth", "Woolly Monkey", "Woolly Rhinoceros", "Worm", "Worm Snake", "Wrasse", "Writing Spider", "Wrought Iron Butterflyfish", "Wryneck", "Wyoming Toad", "X-Ray Tetra", "Xeme", "Xenacanthus", "Xenoceratops", "Xenotarsosaurus", "Xerus", "Xiaosaurus", "Xiaotingia", "Xiphactinus", "Xoloitzcuintli", "Yak", "Yakutian Laika", "Yarara", "Yellow Anaconda", "Yellow Aphids", "Yellow Bellied Sapsucker", "Yellow Belly Ball Python", "Yellow Cobra", "Yellow Crazy Ant", "Yellow Perch", "Yellow Sac Spider", "Yellow Spotted Lizard", "Yellow Tanager", "Yellow Tang", "Yellow-Bellied Sea Snake", "Yellow-Eyed Penguin", "Yellowfin Tuna", "Yellowhammer", "Yellowthroat", "Yeti Crab", "Yokohama chicken", "Yoranian", "Yorkie Bichon", "Yorkie-poo", "Yorkshire Terrier", "Zebra", "Zebra Finch", "Zebra Mussels", "Zebra Pleco", "Zebra Shark", "Zebra Snake", "Zebra Spitting Cobra", "Zebra Tarantula", "Zebu", "Zokor", "Zonkey", "Zorse", "Zuchon"];
function P(e2) {
  return n(I, e2);
}
var x = ["us-east-2", "us-east-1", "us-west-1", "us-west-2", "af-south-1", "ap-east-1", "ap-southeast-3", "ap-south-1", "ap-northeast-3", "ap-northeast-2", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-south-1", "eu-west-3", "eu-north-1", "me-south-1", "sa-east-1", "us-gov-east-1", "us-gov-west-1"];
function D(e2) {
  return n(x, e2);
}
var G = ["/usr/X11R6", "/sys", "/mnt", "/Network", "/usr/libdata", "/Library", "/sbin", "/tmp", "/usr/local/src", "/boot/defaults", "/etc/mail", "/bin", "/boot", "/var/tmp", "/etc/namedb", "/private/var", "/var/mail", "/opt", "/opt/lib", "/proc", "/usr/include", "/usr/src", "/home/user", "/selinux", "/usr/libexec", "/dev", "/etc/defaults", "/usr", "/usr/share", "/rescue", "/private", "/usr/sbin", "/home/user/dir", "/Users", "/var", "/lost+found", "/usr/bin", "/etc/ppp", "/var/spool", "/var/yp", "/usr/ports", "/private/tmp", "/usr/obj", "/home", "/media"];
function F(e2) {
  return n(G, e2);
}
var q = ["markets", "solid_backing_strategist", "granite", "synthesizing_executive_specialist", "ecuador", "calculate_island", "nevada", "gloves_manat_delaware", "loan_saint", "client_server", "kroon", "investor", "dynamic_portal", "pixel", "concrete", "nuevo_avon_market", "productize_withdrawal_override", "operative_sum_bypassing", "visionary_online_account", "balboa", "sql_connecting", "incredible_azure_interface", "open_source_netherlands_copying", "hack_hard_thailand", "berkshire_car_micronesia", "pound_program_handmade", "implement_nevada", "home", "agp", "berkshire_investment_tasty", "licensed_pink_fundamental", "concrete_encompassing", "holistic", "application_saint_infrastructureg", "visionary", "towels_visionary_ergonomic", "scalable_jewelery_sudan", "revolutionary", "global_fresh_open_source", "png_capacitor_quantify", "automotive", "action_items", "soap_unbranded", "music_payment_payment", "chips_taiwan", "payment", "intelligent_connecting_account", "capacitor_bypass", "tools_vatu", "interface", "e_markets", "transmit_borders_input", "invoice", "ball_orange", "morph_magnetic", "team_oriented_ivory", "concrete_compress", "market_hack", "wireless_frictionless_chicken", "png", "turquoise_territories_berkshire", "back_end", "withdrawal_paradigm_matrix", "payment_context_sensitive_wisconsin", "unbranded_json_wooden", "invoice_sleek_customized", "silver_copying", "licensed", "plug_and_play", "cultivate_orchestrator", "quantifying_quantify_norway", "account_borders_gourde", "quantifyg", "open_architected_content_based_protocol", "administrator", "synthesizing", "metrics", "white_wireless_garden", "berkshireg", "nepal_view_protocol", "calculating_shirt", "fuchsia_reintermediate_fish", "extend", "matrix", "peso", "superstructure_value_added_redundant", "national_world_classv", "yellowv", "moratorium", "views", "metal_drive_sports", "ports_pink_overriding", "borders", "supply_chains_client_driven_dynamic", "shirt_moratorium_place", "calculate", "protocol_engineer_azerbaijan", "chair_rss", "b2b_belarussian", "fiji"];
function L(e2) {
  const a = e2?.extension ?? "pdf";
  return n(() => `${r(q)}.${a}`, e2);
}
var R = ["aws", "aws-cn", "aws-us-gov"];
var E = ["s3", "sqs", "lambda", "iam"];
var H = { s3: () => `::${F()}/*`, iam: () => `:${h()}:${n(["user", "group"])}/*`, sqs: () => `${D()}:${h()}:queue${k({ min: 1, max: 10 })}`, lambda: () => `${D()}:${h()}:function:${L().replace(/_/g, "-")}` };
function W(e2) {
  return n(() => {
    const e3 = n(R), a = n(E);
    return `arn:${e3}:${a}:${H[a]()}`;
  }, e2);
}
function N(e2) {
  const a = e2?.size ?? 100;
  return n(() => `https://i.pravatar.cc/${a}`, e2);
}
var z = ["EC2", "RDS", "S3", "Lambda", "CloudFront", "Glacier", "SNS", "SQS", "EBS", "VPC", "Kinesis", "Kinesis Data Firehose", "Dynamo DB", "ElastiCache", "CloudWatch", "Cognito", "API Gateway", "AppSync", "Athena"];
function K(e2) {
  return n(z, e2);
}
function O(e2) {
  return n(() => [S({ length: 8 }), S({ length: 4 }), S({ length: 4 }), S({ length: 4 }), S({ length: 12 })].map((e3) => e3.join("")).join("-"), e2);
}
var J = ["Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox", "Chicago Cubs", "Chicago White Sox", "Cincinnati Reds", "Cleveland Guardians", "Colorado Rockies", "Detroit Tigers", "Houston Astros", "Kansas City Royals", "Los Angeles Angels", "Los Angeles Dodgers", "Miami Marlins", "Milwaukee Brewers", "Minnesota Twins", "New York Mets", "New York Yankees", "Oakland Athletics", "Philadelphia Phillies", "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants", "Seattle Mariners", "St. Louis Cardinals", "Tampa Bay Rays", "Texas Rangers", "Toronto Blue Jays", "Washington Nationals"];
function V(e2) {
  return n(J, e2);
}
var U = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"];
function j(e2) {
  return n(U, e2);
}
var _ = ["Spectacled bear", "Brown bear", "Asian black bear", "Sun bear", "Polar bear", "Giant panda", "Sloth bear", "American black bear"];
function Y(e2) {
  return n(_, e2);
}
function Q(e2) {
  const a = new Date(e2.from).getTime(), t2 = new Date(e2.to).getTime();
  if (a >= t2)
    throw new Error("From must be before to");
  return n(() => new Date(k({ min: a, max: t2 })), e2);
}
var $ = ["MS", "TW", "LR", "HU", "PK", "GQ", "GG", "SZ", "MQ", "AS", "WS", "BJ", "NR", "FJ", "ZM", "CR", "BO", "AW", "AI", "GW", "PF", "MO", "PE", "UZ", "JM", "KH", "RW", "GN", "IN", "MR", "MC", "KG", "SA", "SV", "TZ", "ME", "BB", "IE", "LY", "TM", "SN", "MA", "BN", "ML", "LV", "SM", "HT", "NF", "TD", "UA", "FM", "KM", "CN", "GF", "MT", "RO", "PA", "FI", "BG", "KZ", "PN", "BL", "NO", "IM", "AQ", "MV", "LA", "NU", "LS", "CW", "CF", "GT", "TL", "RU", "BQ", "GB", "BV", "TC", "EC", "NG", "AD", "RE", "SL", "CL", "ER"];
var Z = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "AIA", "ATA", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BES", "BIH", "BWA", "BVT", "BRA", "IOT", "BRN", "BGR", "BFA", "BDI", "CPV", "KHM", "CMR", "CAN", "CYM", "CAF", "TCD", "CHL", "CHN", "CXR", "CCK", "COL", "COM", "COG", "COD", "COK", "CRI", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "SWZ", "ETH", "FLK", "FRO", "FJI", "FIN", "FRA", "GUF", "PYF", "ATF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GLP", "GUM", "GTM", "GGY", "GIN", "GNB", "GUY", "HTI", "HMD", "VAT", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JEY", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MTQ", "MRT", "MUS", "MYT", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MSR", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "NIU", "NFK", "MKD", "MNP", "NOR", "OMN", "PAK", "PLW", "PSE", "PAN", "PNG", "PRY", "PER", "PHL", "PCN", "POL", "PRT", "PRI", "QAT", "REU", "ROU", "RUS", "RWA", "BLM", "SHN", "KNA", "LCA", "MAF", "SPM", "VCT", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SGS", "SSD", "ESP", "LKA", "SDN", "SUR", "SJM", "SWE", "CHE", "SYR", "TWN", "TJK", "TZA", "THA", "TLS", "TGO", "TKL", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "UMI", "URY", "UZB", "VUT", "VEN", "VNM", "VGB", "VIR", "WLF", "ESH", "YEM", "ZMB", "ZWE"];
function X(e2) {
  return n(e2?.alpha3 ? Z : $, e2);
}
function ee(e2) {
  if (e2?.bankCode && 4 !== e2?.bankCode?.length)
    throw new Error("bank code should be valid 4 letters. For example DEUT");
  return n(() => {
    const a = e2?.bankCode ?? "####".replace(/#/g, () => w()), t2 = e2?.countryCode ?? X(), i2 = e2?.locationCode ?? "##".replace(/#/g, () => w()), o2 = e2?.branchCode ?? "###".replace(/#/g, () => S().toString());
    return `${a}${t2}${i2}${e2?.fillBranchCode ? "XXX" : o2}`.toUpperCase();
  }, e2);
}
function ae(e2) {
  const a = __spreadProps(__spreadValues({}, e2), { length: void 0 });
  return n(() => ee(a).toString(), e2);
}
function te(e2) {
  return n(() => {
    const e3 = s({ min: 0, max: Number.MAX_SAFE_INTEGER, fraction: 0 });
    return BigInt(e3.toString(2)).toString();
  }, e2);
}
var ie = ["Red-necked Phalarope", "Cliff Swallow", "Loggerhead Kingbird", "Aztec Thrush", "Hooded Warbler", "Common Pochard", "Scotts Oriole", "Black-browed Albatross", "Monk Parakeet", "Magnificent Hummingbird", "Broad-billed Sandpiper", "Bushtit", "Mexican Jay", "Hooded Merganser", "Wood Stork", "Rosss Gull", "Green Sandpiper", "Whooping Crane"];
function oe(e2) {
  return n(ie, e2);
}
function ne(e2) {
  return n(() => b({ size: 33 }), e2);
}
var re = [{ title: "The Adventures of Augie March", author: "Saul Bellow", category: "Comedy" }, { title: "The Uncommon Reader", author: "Alan Bennett", category: "Comedy" }, { title: "Don Quixote", author: "Miguel de Cervantes", category: "Comedy" }, { title: "Tom Jones", author: "Henry Fielding", category: "Comedy" }, { title: "Dead Souls", author: "Nikolai Gogol", category: "Comedy" }, { title: "The Wind in the Willows", author: "Kenneth Grahame", category: "Comedy" }, { title: "Our Man in Havana", author: "Graham Greene", category: "Comedy" }, { title: "Catch-22", author: "Joseph Heller", category: "Comedy" }, { title: "High Fidelity", author: "Nick Hornby", category: "Comedy" }, { title: "Three Men in a Boat", author: "Jerome K Jerome", category: "Comedy" }, { title: "Finnegans Wake", author: "James Joyce", category: "Comedy" }, { title: "Puckoon", author: "Spike Milligan", category: "Comedy" }, { title: "Portnoy’s Complaint", author: "Philip Roth", category: "Comedy" }, { title: "Great Apes", author: "Will Self", category: "Comedy" }, { title: "The Life and Opinions of Tristram Shandy, Gentleman", author: "Laurence Sterne", category: "Comedy" }, { title: "A Confederacy of Dunces", author: "John Kennedy Toole", category: "Comedy" }, { title: "Breakfast of Champions", author: "Kurt Vonnegut", category: "Comedy" }, { title: "Infinite Jest", author: "David Foster Wallace", category: "Comedy" }, { title: "Molesworth", author: "Geoffrey Willans and Ronald Searle", category: "Comedy" }, { title: "Thank You Jeeves", author: "PG Wodehouse", category: "Comedy" }, { title: "The Thirty-Nine Steps", author: "John Buchan", category: "Crime" }, { title: "The Big Sleep", author: "Raymond Chandler", category: "Crime" }, { title: "And Then There Were None", author: "Agatha Christie", category: "Crime" }, { title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", category: "Crime" }, { title: "The Manchurian Candidate", author: "Richard Condon", category: "Crime" }, { title: "The Andromeda Strain", author: "Michael Crichton", category: "Crime" }, { title: "The Ipcress File", author: "Len Deighton", category: "Crime" }, { title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Crime" }, { title: "The Count of Monte Cristo", author: "Alexandre Dumas", category: "Crime" }, { title: "The Day of the Jackal", author: "Frederick Forsyth", category: "Crime" }, { title: "The Third Man", author: "Graham Greene", category: "Crime" }, { title: "A Time to Kill", author: "John Grisham", category: "Crime" }, { title: "The Thin Man", author: "Dashiell Hammett", category: "Crime" }, { title: "The Talented Mr Ripley", author: "Patricia Highsmith", category: "Crime" }, { title: "Tinker, Tailor, Soldier, Spy", author: "John le Carre", category: "Crime" }, { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Crime" }, { title: "No Country for Old Men", author: "Cormac McCarthy", category: "Crime" }, { title: "The Godfather", author: "Mario Puzo", category: "Crime" }, { title: "The Crying of Lot 49", author: "Thomas Pynchon", category: "Crime" }, { title: "Judgment in Stone", author: "Ruth Rendell", category: "Crime" }, { title: "Little Women", author: "Louisa May Alcott", category: "Family and Self" }, { title: "Le Pere Goriot", author: "Honore de Balzac", category: "Family and Self" }, { title: "The Outsider", author: "Albert Camus", category: "Family and Self" }, { title: "Great Expectations", author: "Charles Dickens", category: "Family and Self" }, { title: "The Sound and the Fury", author: "William Faulkner", category: "Family and Self" }, { title: "Howards End", author: "EM Forster", category: "Family and Self" }, { title: "The Power and the Glory", author: "Graham Greene", category: "Family and Self" }, { title: "Steppenwolf", author: "Herman Hesse", category: "Family and Self" }, { title: "A Prayer for Owen Meany", author: "John Irving", category: "Family and Self" }, { title: "Ulysses", author: "James Joyce", category: "Family and Self" }, { title: "One Flew Over the Cuckoo’s Nest", author: "Ken Kesey", category: "Family and Self" }, { title: "How Green was My Valley", author: "Richard Llewellyn", category: "Family and Self" }, { title: "The Bluest Eye", author: "Toni Morrison", category: "Family and Self" }, { title: "Who Do You Think You Are?", author: "Alice Munro", category: "Family and Self" }, { title: "The Bell Jar", author: "Sylvia Plath", category: "Family and Self" }, { title: "Remembrance of Things Past", author: "Marcel Proust", category: "Family and Self" }, { title: "The Catcher in the Rye", author: "JD Salinger", category: "Family and Self" }, { title: "The Color Purple", author: "Alice Walker", category: "Family and Self" }, { title: "Jimmy Corrigan, The Smarest Kid on Earth", author: "Chris Ware", category: "Family and Self" }, { title: "The Picture of Dorian Gray", author: "Oscar Wilde", category: "Family and Self" }, { title: "Pride and Prejudice", author: "Jane Austen", category: "Love" }, { title: "Jane Eyre", author: "Charlotte Bronte", category: "Love" }, { title: "Wuthering Heights", author: "Emily Bronte", category: "Love" }, { title: "Breakfast at Tiffany’s", author: "Truman Capote", category: "Love" }, { title: "Rebecca", author: "Daphne du Maurier", category: "Love" }, { title: "Daniel Deronda", author: "George Eliot", category: "Love" }, { title: "The Great Gatsby", author: "F Scott Fitzgerald", category: "Love" }, { title: "Madame Bovary", author: "Gustave Flaubert", category: "Love" }, { title: "A Room with a View", author: "EM Forster", category: "Love" }, { title: "The Sorrows of Young Werther", author: "Johann Wolfgang Goethe", category: "Love" }, { title: "Far From the Madding Crowd", author: "Thomas Hardy", category: "Love" }, { title: "The Scarlet Letter", author: "Nathaniel Hawthorne", category: "Love" }, { title: "The Remains of the Day", author: "Kazuo Ishiguro", category: "Love" }, { title: "Les Liaisons Dangereuses", author: "Pierre-Ambroise-Francois Choderlos de Laclos", category: "Love" }, { title: "Of Human Bondage", author: "Somerset Maugham", category: "Love" }, { title: "Atonement", author: "Ian McEwan", category: "Love" }, { title: "Gone With the Wind", author: "Margaret Mitchell", category: "Love" }, { title: "Norwegian Wood", author: "Haruki Murakami", category: "Love" }, { title: "Doctor Zhivago", author: "Boris Pasternak", category: "Love" }, { title: "Wide Sargasso Sea", author: "Jean Rhys", category: "Love" }, { title: "The Hitchhikers Guide to the Galaxy", author: "Douglas Adams", category: "Science Fiction and Fantasy" }, { title: "Foundation", author: "Isaac Asimov", category: "Science Fiction and Fantasy" }, { title: "Fahrenheit 451", author: "Ray Bradbury", category: "Science Fiction and Fantasy" }, { title: "Alice’s Adventures in Wonderland", author: "Lewis Carroll", category: "Science Fiction and Fantasy" }, { title: "The Man who was Thursday", author: "GK Chesterton", category: "Science Fiction and Fantasy" }, { title: "Childhood’s End", author: "Arthur C Clarke", category: "Science Fiction and Fantasy" }, { title: "Do Androids Dream of Electric Sheep?", author: "Philip K Dick", category: "Science Fiction and Fantasy" }, { title: "American Gods", author: "Neil Gaiman", category: "Science Fiction and Fantasy" }, { title: "Neuromancer", author: "William Gibson", category: "Science Fiction and Fantasy" }, { title: "Dune", author: "Frank L Herbert", category: "Science Fiction and Fantasy" }, { title: "The Turn of the Screw", author: "Henry James", category: "Science Fiction and Fantasy" }, { title: "The Shining", author: "Stephen King", category: "Science Fiction and Fantasy" }, { title: "The Earthsea Series", author: "Ursula Le Guin", category: "Science Fiction and Fantasy" }, { title: "The Chronicles of Narnia", author: "CS Lewis", category: "Science Fiction and Fantasy" }, { title: "Nineteen Eighty-Four", author: "George Orwell", category: "Science Fiction and Fantasy" }, { title: "The Discworld Series", author: "Terry Pratchett", category: "Science Fiction and Fantasy" }, { title: "Frankenstein", author: "Mary Shelley", category: "Science Fiction and Fantasy" }, { title: "The Strange Case of Dr Jekyll and Mr Hyde", author: "Robert Louis Stevenson", category: "Science Fiction and Fantasy" }, { title: "Dracula", author: "Bram Stoker", category: "Science Fiction and Fantasy" }, { title: "The Lord of the Rings", author: "JRR Tolkien", category: "Science Fiction and Fantasy" }, { title: "Things Fall Apart", author: "Chinua Achebe", category: "State of the Nation" }, { title: "Go Tell it on the Mountain", author: "James Baldwin", category: "State of the Nation" }, { title: "Uncle Tom’s Cabin", author: "Harriet Beecher Stowe", category: "State of the Nation" }, { title: "Moll Flanders", author: "Daniel Defoe", category: "State of the Nation" }, { title: "A Tale of Two Cities", author: "Charles Dickens", category: "State of the Nation" }, { title: "North and South", author: "Elizabeth Gaskell", category: "State of the Nation" }, { title: "Les Miserables", author: "Victor Hugo", category: "State of the Nation" }, { title: "A Girl in Winter", author: "Philip Larkin", category: "State of the Nation" }, { title: "The Magic Mountain", author: "Thomas Mann", category: "State of the Nation" }, { title: "Bel-Ami", author: "Guy de Maupassant", category: "State of the Nation" }, { title: "Animal Farm", author: "George Orwell", category: "State of the Nation" }, { title: "Cry, the Beloved Country", author: "Alan Paton", category: "State of the Nation" }, { title: "The Jungle", author: "Upton Sinclair", category: "State of the Nation" }, { title: "White Teeth", author: "Zadie Smith", category: "State of the Nation" }, { title: "The Grapes of Wrath", author: "John Steinbeck", category: "State of the Nation" }, { title: "Vanity Fair", author: "William Makepeace Thackeray", category: "State of the Nation" }, { title: "The Way We Live Now", author: "Anthony Trollope", category: "State of the Nation" }, { title: "The Adventures of Tom Sawyer", author: "Mark Twain", category: "State of the Nation" }, { title: "The Bonfire of the Vanities", author: "Tom Wolfe", category: "State of the Nation" }, { title: "Germinal", author: "Emile Zola", category: "State of the Nation" }, { title: "Empire of the Sun", author: "JG Ballard", category: "War and Travel" }, { title: "Heart of Darkness", author: "Joseph Conrad", category: "War and Travel" }, { title: "Robinson Crusoe", author: "Daniel Defoe", category: "War and Travel" }, { title: "The Three Musketeers", author: "Alexandre Dumas", category: "War and Travel" }, { title: "King Solomon’s Mines", author: "H Rider Haggard", category: "War and Travel" }, { title: "Enigma", author: "Robert Harris", category: "War and Travel" }, { title: "The Good Soldier Svejk", author: "Jaroslav Hasek", category: "War and Travel" }, { title: "For Whom the Bell Tolls", author: "Ernest Hemingway", category: "War and Travel" }, { title: "On the Road", author: "Jack Kerouac", category: "War and Travel" }, { title: "The Call of the Wild", author: "Jack London", category: "War and Travel" }, { title: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", category: "War and Travel" }, { title: "Moby-Dick or, The Whale", author: "Herman Melville", category: "War and Travel" }, { title: "Zen and the Art of Motorcycle Maintenance", author: "Robert Pirsig", category: "War and Travel" }, { title: "All Quiet on the Western Front", author: "Erich Maria Remarque", category: "War and Travel" }, { title: "Ivanhoe", author: "Sir Walter Scott", category: "War and Travel" }, { title: "Treasure Island", author: "Robert Louis Stevenson", category: "War and Travel" }, { title: "Gulliver’s Travels", author: "Jonathan Swift", category: "War and Travel" }, { title: "War and Peace", author: "Leo Tolstoy", category: "War and Travel" }, { title: "Around the World in Eighty Days", author: "Jules Verne", category: "War and Travel" }, { title: "The Caine Mutiny", author: "Herman Wouk", category: "War and Travel" }];
function se(e2) {
  return n(e2?.category ? re.filter(({ category: a }) => a === e2.category) : re, e2);
}
var le = ["Apple", "Amazon", "Microsoft", "Google", "Samsung", "Coca-Cola", "Toyota", "Mercedes", "McDonald’s", "Disney", "BMW", "Intel", "Facebook", "IBM", "Nike", "Cisco", "Louis Vuitton", "SAP", "Instagram", "Honda", "Chanel", "J.P. Morgan", "American Express", "UPS", "Ikea", "Pepsi", "Adobe", "Hermès", "General Electric", "YouTube", "Accenture", "Gucci", "Budweiser", "Pampers", "Zara", "Hyundai", "H&M", "Nescafé", "Allianz", "Tesla", "Netflix", "Ford", "L'Oreal", "Audi", "Visa", "Ebay", "Volkswagen", "AXA", "Goldman Sachs", "Adidas", "Sony", "Citi", "Philips", "Gillette", "Porsche", "Starbucks", "Mastercard", "Salesforce", "Nissan", "PayPal", "Siemens", "Danone", "Nestlé", "HSBC", "Hewlett Packard", "Kellogg's", "3M", "Colgate", "Morgan Stanely", "Spotify", "Canon", "Lego", "Cartier", "Santander", "FedEx", "Nintendo", "Hewlett Packard Enterprise", "Corona", "Ferrari", "Huawei", "DHL", "Jack Daniel's", "Dior", "Caterpillar", "Panasonic", "Kia", "Johnson & Johnson", "Heineken", "John Deere", "LinkedIn", "Hennessy", "KFC", "Land Rover", "Tiffany & Co.", "Mini", "Uber", "Burberry", "Johnnie Walker", "Prada", "Zoom"];
function ue(e2) {
  return n(le, e2);
}
var ce = ["Chrome", "Edge", "Firefox", "Internet Explorer", "Safari", "Opera", "Yandex", "Chromium", "Vivaldi", "Baidu", "Brave"];
function de(e2) {
  return n(ce, e2);
}
var he = ["East", "South", "West", "North"];
function me(e2) {
  return n(he, e2);
}
var pe = ["Japanese Bobtail", "Savannah", "LaPerm", "Siberian", "Ocicat", "Birman", "Devon Rex", "Minskin", "Serengeti", "Bombay", "Himalayan", "American Curl", "Thai", "Balinese", "Singapura", "American Shorthair", "Ojos Azules", "Burmese"];
function ye(e2) {
  return n(pe, e2);
}
var ge = ["Persevering encompassing middleware", "Multi-layered zero administration system engine", "Digitized attitude-oriented implementation", "Multi-lateral zero defect throughput", "Profit-focused coherent application", "Decentralized human-resource system engine", "Right-sized client-driven firmware", "Cloned incremental structure", "Streamlined impactful alliance", "Visionary fresh-thinking instruction set", "Networked exuding monitoring", "Organized contextually-based function", "Enterprise-wide directional orchestration", "Universal empowering product", "Reduced regional frame", "Monitored bottom-line productivity", "Reduced multi-tasking encoding", "Enhanced responsive software", "Multi-tiered exuding approach", "Balanced stable knowledge user", "Re-engineered neutral database", "Versatile national time-frame", "Exclusive fresh-thinking workforce", "Virtual background paradigm", "Upgradable cohesive knowledge user", "De-engineered needs-based hardware", "Networked mobile moratorium", "Inverse contextually-based portal", "De-engineered full-range extranet", "Advanced transitional support", "Business-focused stable framework", "Reactive 4th generation info-mediaries", "Switchable upward-trending array", "Integrated regional open architecture", "Reactive local implementation", "Focused asymmetric contingency", "Synergized 4th generation success", "Mandatory regional complexity", "Proactive client-server access", "Implemented well-modulated task-force", "Pre-emptive clear-thinking groupware", "Balanced radical archive", "Managed explicit installation", "Switchable next generation intranet", "Quality-focused coherent groupware", "Customizable client-driven encoding", "Centralized impactful contingency", "Streamlined executive Graphic Interface", "Seamless bi-directional capacity", "Synchronised 24 hour emulation", "Robust heuristic installation", "Face to face 6th generation complexity", "Vision-oriented holistic protocol", "Ameliorated asynchronous pricing structure", "Profit-focused executive core", "Multi-channelled zero tolerance core", "Customizable global open system", "Robust foreground synergy", "Up-sized eco-centric pricing structure", "Upgradable stable strategy", "Synergized client-server architecture", "Focused logistical definition", "Secured holistic architecture", "Adaptive asymmetric infrastructure", "Digitized clear-thinking firmware", "De-engineered eco-centric installation", "Stand-alone next generation task-force", "User-centric optimizing implementation", "Re-contextualized grid-enabled portal", "Extended asynchronous system engine", "Reactive neutral moderator", "Expanded 4th generation Graphic Interface", "Optimized contextually-based toolset", "Operative bi-directional protocol", "De-engineered dynamic frame", "User-friendly disintermediate alliance", "Fundamental client-server data-warehouse", "Ameliorated multimedia groupware", "Secured methodical frame", "Organized maximized firmware", "User-centric executive knowledge user", "Configurable global help-desk", "Realigned empowering monitoring", "Enterprise-wide 24 hour info-mediaries", "Expanded didactic methodology", "Configurable zero administration projection", "Fundamental multi-tasking standardization", "Future-proofed leading edge secured line", "Polarised global open system", "Re-engineered upward-trending standardization", "Stand-alone needs-based pricing structure", "Synergistic responsive service-desk", "Re-engineered 24/7 paradigm", "Compatible fresh-thinking success", "Innovative background attitude", "Automated modular access", "Distributed heuristic archive", "Cloned human-resource knowledge base", "User-friendly impactful utilisation", "Reactive motivating data-warehouse"];
function fe(e2) {
  return n(ge, e2);
}
var be = ["Clymene Dolphin", "Bottlenose Dolphin", "Costero", "Chilean Dolphin", "Heaviside’s Dolphin", "Pantropical Spotted Dolphin", "Sperm Whale", "Burrunan Dolphin", "Bryde’s whale", "Atlantic White-Sided Dolphin", "Northern Rightwhale Dolphin", "Killer Whale (Orca)", "False Killer Whale", "Ganges River Dolphin", "Pacific White-Sided Dolphin", "Blue Whale", "Southern Bottlenose Whale", "Peale’s Dolphin"];
function we(e2) {
  return n(be, e2);
}
var ve = ["South Dagmarshire", "New Solonmouth", "New Montemouth", "Langborough", "Padbergmouth", "Connfurt", "Metairie", "New Merle", "Willbury", "North Sigmund", "Opalbury", "North Antonetta", "Tallahassee", "Janefurt", "Port Adalberto", "West Dorris", "Kettering", "Lake Adell", "Bellingham", "Buffalo", "West Brendonville", "South Laila", "West Lucy", "Marionton", "Lake Brianne", "New Ansley", "Johnnieburgh", "Jaskolskifort", "New Davonteside", "New Kyle", "Williemouth", "Lake Cesar", "Bernierfurt", "West Janetborough", "Port Asa", "East Filibertofurt", "Fort Lauderdale", "West Dellside", "Glen Burnie", "Port Amie", "Shoreline", "West Estaton", "Cuyahoga Falls", "North Kaleighshire", "Kuvalismouth", "South Darienbury", "Venamouth", "North Winnifred", "Bahringertown", "Haneborough", "South Ahmedfort", "East Khalilton", "Aliso Viejo", "Jaquelinview", "Lake Ludie", "West Simone", "Katrinaside", "North Nona", "Tryciastad", "Tabithaville", "Frisco", "Olympia", "State College", "New Garlandfort", "Lake Anthony", "West Everardo", "Wehnerfort", "South Verdieton", "Lawrence", "New Wallaceberg", "White Plains", "South Stacey", "Farmington", "Borerville", "Erynside", "Lake Zackton", "Port Salvador", "Funkville", "North Frankie", "East Vicentaborough", "North Braulio", "East Providence", "Denesikburgh", "New Philip", "Durwardton", "Kissimmee", "North Celia", "Maxwellport", "Reichertland", "Rettaland", "West Amiya", "Elisabethland", "Rogers", "Henderson", "Franeckiview", "Grand Rapids", "Murray", "Port Ricky", "Port Hardymouth", "Cruzshire"];
function ke(e2) {
  return n(ve, e2);
}
var Se = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
function Ce(e2) {
  return n(Se, e2);
}
var Ae = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
function Me(e2) {
  return n(Ae, e2);
}
var Te = ["Kautzer, Macejkovic and Fisher", "Greenholt - Mosciski", "Marquardt - Runolfsdottir", "Abernathy Inc", "Dickens - Lang", "Hand, Bernhard and Kessler", "Abbott LLC", "Kub Inc", "Johnston - Wisozk", "Reichert LLC", "Kohler LLC", "Shanahan - Boyle", "Batz - Rice", "Cronin, Oberbrunner and Beier", "Kuhlman, Schowalter and West", "Luettgen Inc", "Ward Group", "Hills and Sons", "Prohaska, Balistreri and Walker", "Rempel - Durgan", "Bernier LLC", "Stehr - Lockman", "Roberts, Rogahn and Dooley", "Lesch - Jakubowski", "Jenkins - Turcotte", "Gerhold - Rowe", "Block - Rau", "Dickinson, Tremblay and Moore", "Nader - Fritsch", "Kreiger and Sons", "Bartell, Wehner and Schowalter", "Hegmann Inc", "Orn, Spencer and Kiehn", "Graham, Sipes and Towne", "Hodkiewicz Inc", "Mills Group", "Legros, Tillman and Hodkiewicz", "Lesch - Carter", "Lesch Group", "Kreiger - Sauer", "Cartwright - Schuster", "Labadie LLC", "Pfannerstill, White and Mosciski", "Jenkins LLC", "Boehm, Hettinger and Huels", "Maggio, Wisoky and Blick", "Kozey Inc", "Stracke - Wisozk", "Olson, Olson and Carter", "Orn, Gerlach and Runolfsdottir", "Stracke - Kertzmann", "Walker - Zieme", "Hodkiewicz - Hintz", "Lind Group", "Fahey, Leannon and Gleichner", "Mertz, Gusikowski and Lemke", "Heidenreich - Aufderhar", "Zboncak and Sons", "Carroll Group", "Brown LLC", "Weber Inc", "Rath LLC", "Walker Inc", "Heller, Hyatt and Jaskolski", "Jacobi - Kutch", "Skiles and Sons", "Durgan - Stamm", "Renner - Prosacco", "Hahn - Welch", "Lesch, Dooley and Bartell", "Crona and Sons", "Rogahn, Armstrong and Goyette", "Lubowitz, Kuhlman and Bailey", "Doyle Group", "Dooley and Sons", "Kerluke LLC", "Bogan - Daniel", "Hintz - Boehm", "Swaniawski and Sons", "Kris, Legros and Cartwright", "Reichel Group", "Russel - Hintz", "Welch, Lockman and Hand", "Pouros - Brakus", "Mohr, Fritsch and Wisozk", "Upton - Reichert", "Koepp and Sons", "Weber and Sons", "Quigley, Bins and Becker", "Strosin, Oberbrunner and Wunsch", "Rodriguez - Spencer", "Wilkinson - Dare", "Gutkowski Inc", "OReilly LLC", "Collins, Mante and Pacocha", "Steuber, Luettgen and Corkery", "Kub and Sons", "Lesch and Sons"];
function Be(e2) {
  return n(Te, e2);
}
var Ie = ["Argentina", "Peru", "Colombia", "Chile", "Uruguay", "Gabon", "Congo", "Norfolk Island", "Qatar", "Syrian Arab Republic", "Wallis and Futuna", "Somalia", "Saint Barthelemy", "Comoros", "Sri Lanka", "Czech Republic", "Christmas Island", "Macao", "Montenegro", "Anguilla", "Canada", "Mayotte", "Tajikistan", "Afghanistan", "Liechtenstein", "Cocos (Keeling) Islands", "Angola", "Bahrain", "Dominican Republic", "Croatia", "Latvia", "Virgin Islands, U.S.", "United Kingdom", "Brazil", "Spain", "Mongolia", "Montserrat", "Estonia", "Benin", "Guinea", "Guinea-Bissau", "Greece", "Lao Peoples Democratic Republic", "Puerto Rico", "Slovakia (Slovak Republic)", "United States of America", "Switzerland", "Costa Rica", "Mauritius", "Nigeria", "Russian Federation", "Germany", "Antigua and Barbuda", "Albania", "Romania", "Moldova", "Senegal", "Tanzania", "British Indian Ocean Territory (Chagos Archipelago)", "Central African Republic", "New Caledonia", "Burundi", "Panama", "Azerbaijan", "Namibia", "French Southern Territories", "Vanuatu", "Ethiopia", "Burkina Faso", "Tunisia", "Mozambique", "Belarus", "Saint Kitts and Nevis", "Hungary", "Indonesia", "Cyprus", "Ecuador", "Saint Martin", "Nauru", "Faroe Islands", "Iran", "Bolivia", "Pitcairn Islands", "France", "Paraguay", "Isle of Man", "Sierra Leone", "Monaco", "Belize", "Trinidad and Tobago"];
function Pe(e2) {
  return n(Ie, e2);
}
var xe = ["Bedfordshire", "Berkshire", "Bristol", "Buckinghamshire", "Cambridgeshire", "Cheshire", "City of London", "Cornwall", "Cumbria", "Derbyshire", "Devon", "Dorset", "Durham", "East Riding of Yorkshire", "East Sussex", "Essex", "Gloucestershire", "Greater London", "Greater Manchester", "Hampshire", "Herefordshire", "Hertfordshire", "Isle of Wight", "Kent", "Lancashire", "Leicestershire", "Lincolnshire", "Merseyside", "Norfolk", "North Yorkshire", "Northamptonshire", "Northumberland", "Nottinghamshire", "Oxfordshire", "Rutland", "Shropshire", "Somerset", "South Yorkshire", "Staffordshire", "Suffolk", "Surrey", "Tyne and Wear", "Warwickshire", "West Midlands", "West Sussex", "West Yorkshire", "Wiltshire", "Worcestershire"];
function De(e2) {
  return n(xe, e2);
}
var Ge = ["Hartón del Valle", "Pedit", "German Black Pied cattle", "Parda Alpina", "Dajal", "Raya", "Adamawa", "Blaarkop", "Doayo cattle", "Aulie-Ata", "North Bengal Grey", "Nguni", "Canaria", "Siri", "Breed", "Hallikar4", "Simmental", "Pie Rouge des Plaines"];
function Fe(e2) {
  return n(Ge, e2);
}
function qe(e2) {
  return n(() => s({ min: 100, max: 999 }).toString(), e2);
}
var Le = ["American Express", "T-Union", "UnionPay", "Diners Club", "Discover Card", "UkrCard", "RuPay", "InterPayment", "InstaPayment", "JCB", "Maestro UK", "Maestro", "Dankort", "Mir", "NPS Pridnestrovie", "Mastercard", "51–55", "Troy", "Visa", "Visa Electron", "UATP", "Verve"];
function Re(e2) {
  return n(Le, e2);
}
var Ee = [{ brand: "American Express", formats: ["34## ###### #####", "37## ###### #####"] }, { brand: "UnionPay", formats: ["62## #### #### ####", "62#### #############"] }, { brand: "Diners Club", formats: ["300# ###### ####", "301# ###### ####", "302# ###### ####", "303# ###### ####", "304# ###### ####", "305# ###### ####", "309# ###### ####", "36## ###### ####", "38## ###### ####", "39## ###### ####", "54## #### #### ####", "55## #### #### ####"] }, { brand: "Discover Card", formats: ["6011 #### #### ####", "644# #### #### ####", "645# #### #### ####", "646# #### #### ####", "647# #### #### ####", "648# #### #### ####", "649# #### #### ####", "65## #### #### ####"] }, { brand: "RuPay", formats: ["60## #### #### ####", "65## #### #### ####", "81## #### #### ####", "82## #### #### ####", "508# #### #### ####", "353# #### #### ####", "356# #### #### ####"] }, { brand: "JCB", formats: ["3528 #### #### ####", "3565 #### #### ####", "3572 #### #### ####", "3589 #### #### ####"] }, { brand: "Maestro", formats: ["5018 #### #####", "5020 #### #####", "5038 #### #####", "5893 ###### #####", "6304 #### #### ####", "6759 #### #### ####", "6761 #### #### #### ###", "6762 #### #### ####", "6763 #### #### #### ###"] }, { brand: "Dankort", formats: ["5019 #### #### ####"] }, { brand: "Mastercard", formats: ["51## #### #### ####", "52## #### #### ####", "53## #### #### ####", "54## #### #### ####", "55## #### #### ####"] }, { brand: "Visa", formats: ["4### #### #### ####"] }, { brand: "Visa Electron", formats: ["4026 #### #### ####", "4175 00## #### ####", "4405 #### #### ####", "4508 #### #### ####", "4844 #### #### ####", "4913 #### #### ####", "4917 #### #### ####"] }, { brand: "UATP", formats: ["1### ##### ######"] }];
function He(e2) {
  const a = e2?.brand ?? Re(), t2 = Ee.find((e3) => e3.brand === a)?.formats, i2 = ["#### #### #### ####"];
  return n(() => r(t2 || i2).replace(/#/g, () => s({ min: 0, max: 9 }).toString()), e2);
}
var We = ["Orinoco Crocodile", "Gharial", "Broad-snouted Caiman", "Saltwater Crocodile", "Black Caiman", "West African Crocodile", "Tomistoma", "Siamese Crocodile", "Philippine Crocodile", "Schneider’s Smooth-fronted Caiman", "Cuban Crocodile", "New Guinea Freshwater Crocodile", "Nile Crocodile", "American Crocodile", "Chinese Alligator", "Dwarf Crocodile", "Yacare Caiman", "African Slender-snouted Crocodile"];
function Ne(e2) {
  return n(We, e2);
}
var ze = ["IRR", "SHP", "NPR", "CAD", "XDR", "BMD", "LTL", "XTS", "CRC", "BYR", "GEL", "PGK", "HKD", "LKR", "IQD", "CVE", "BRL", "MGA", "TMT", "ISK", "GIP", "CUC", "SYP", "MWK", "BND", "AFN", "FKP", "GYD", "PAB", "NAD", "ZMK", "ILS", "KMF", "GBP", "JPY", "MUR", "UAH", "EEK", "SLL", "MMK", "NGN", "SDG", "ALL", "TRY", "BTN", "JMD", "AWG", "GTQ", "VEF", "XAF", "DJF", "NIO", "XAU", "COP", "CHF", "HNL", "DOP", "KHR", "EUR", "CLP", "KES", "TND", "DZD", "GNF", "USD", "MAD", "AOA", "SRD", "TWD", "RWF", "XPT", "PKR", "SOS", "SCR", "GHS", "MNT", "BWP", "AED", "RON"];
function Ke(e2) {
  return n(ze, e2);
}
var Oe = ["Egyptian Pound", "Belize Dollar", "Sudanese Pound", "Palladium", "Mexican Peso", "Rupiah", "Tenge", "Boliviano boliviano", "Vatu", "Lebanese Pound", "Riel", "US Dollar", "Djibouti Franc", "Kwacha", "Hryvnia", "Lari", "Russian Ruble", "Codes specifically reserved for testing purposes", "Kina", "Tunisian Dinar", "Leone", "Brunei Dollar", "Danish Krone", "Nepalese Rupee", "North Korean Won", "Saudi Riyal", "Afghani", "Platinum", "Iraqi Dinar", "Costa Rican Colon", "Singapore Dollar", "Philippine Peso", "Pound Sterling", "Dalasi", "Dobra", "Paanga", "Balboa", "Bermudian Dollar (customarily known as Bermuda Dollar)", "Barbados Dollar", "Pataca", "Kuwaiti Dinar", "CFP Franc", "Uganda Shilling", "Norwegian Krone", "Dong", "Lilangeni", "Croatian Kuna", "Lesotho Loti", "Rufiyaa", "Forint", "Argentine Peso", "Cedi", "Bhutanese Ngultrum", "Dominican Peso", "Somoni", "Guinea Franc", "European Unit of Account 9(E.U.A.-9)", "European Monetary Unit (E.M.U.-6)", "Convertible Marks", "Cuban Peso Convertible", "UAE Dirham", "Iceland Krona", "Gourde", "Som", "Bahamian Dollar", "Kwanza", "Cordoba Oro", "Gold", "Manat", "Burundi Franc", "New Taiwan Dollar", "Fiji Dollar", "Uzbekistan Sum", "Romanian Leu"];
function Je(e2) {
  return n(Oe, e2);
}
var Ve = ["B/.", "£", "Ls", "₡", "NT$", "лв", "$", "R", "Lt", "﷼", "kr", "KM", "៛", "Bs", "₹", "Q", "ƒ", "R$", "₨", "ден", "p.", "₺", "Дин.", "P", "RD$", "L", "Ft", "CHF", "₩", "Php", "S/.", "₭", "RM", "€", "Lek", "¥", "؋", "₦"];
function Ue(e2) {
  return n(Ve, e2);
}
var je = ["utf8_unicode_ci", "cp1250_general_ci", "cp1250_bin", "utf8_general_ci", "ascii_general_ci", "utf8_bin", "ascii_bin"];
function _e(e2) {
  return n(je, e2);
}
var Ye = ["comment", "group", "password", "token", "phone", "title", "status", "id", "name", "updatedAt", "category", "email", "avatar", "createdAt"];
function Qe(e2) {
  return n(Ye, e2);
}
var $e = ["CSV", "ARCHIVE", "MyISAM", "MEMORY", "InnoDB", "BLACKHOLE"];
function Ze(e2) {
  return n($e, e2);
}
var Xe = ["tinyint", "date", "timestamp", "set", "datetime", "enum", "binary", "bigint", "point", "smallint", "text", "bit", "decimal", "varchar", "mediumint", "double", "time", "blob", "geometry", "boolean", "serial", "real", "float"];
function ea(e2) {
  return n(Xe, e2);
}
var aa = ["Oracle", "MySQL", "Microsoft SQL Server", "PostgreSQL", "MongoDB", "IBM Db2", "Redis", "Elasticsearch", "Microsoft Access", "SQLite", "Cassandra", "Splunk", "MariaDB", "Teradata", "Hive", "Solr", "HBase", "FileMaker", "SAP HANA", "Amazon DynamoDB", "SAP Adaptive Server", "Neo4j", "Couchbase", "Memcached", "Microsoft Azure SQL Database"];
function ta(e2) {
  return n(aa, e2);
}
var ia = ["Games", "Automotive", "Music", "Home", "Movies", "Health", "Sports", "Garden", "Baby", "Kids", "Toys", "Computers", "Clothing", "Outdoors", "Shoes", "Jewelery", "Industrial", "Electronics", "Tools", "Grocery", "Beauty", "Books"];
function oa(e2) {
  return n(ia, e2);
}
var na = ["Southwest", "North", "Northeast", "Northwest", "South", "West", "East", "Southeast"];
function ra(e2) {
  return n(na, e2);
}
var sa = ["Jack Russell Terrier", "Beauceron", "Denmark Feist", "Affenpinscher", "Kishu", "Boykin Spaniel", "English Toy Terrier", "Alaskan Malamute", "English Mastiff", "Maltese", "Croatian Sheepdog", "Garafian Shepherd", "Giant Schnauzer", "Austrian Black and Tan Hound", "Basset Fauve de Bretagne", "Pomeranian", "Nova Scotia Duck Tolling Retriever", "Hygen Hound", "Golden Retriever", "Doberman Pinscher", "French Poodle", "Siberian Husky", "Cocker Spaniel"];
function la(e2) {
  return n(sa, e2);
}
var ua = ["org", "biz", "com", "net", "name", "info", "io", "dev"];
function ca(e2) {
  return n(ua, e2);
}
var da = ["est", "voluptatem", "non", "aut", "aliquid", "quaerat", "quos", "vel", "tenetur", "consectetur", "ipsum", "voluptate", "numquam", "nulla", "asperiores", "in", "laborum", "quas", "et", "ullam", "consequuntur", "enim", "dicta", "quia", "facilis", "voluptatibus", "at", "hic", "sunt", "excepturi", "maiores", "vitae", "fugit", "possimus", "unde", "repellat", "sit", "necessitatibus", "nemo", "qui", "exercitationem", "dolores", "esse", "reiciendis", "nihil", "commodi", "id", "sequi", "consequatur", "occaecati", "deserunt", "quae", "eos", "sapiente", "fugiat", "neque", "quasi", "nostrum", "magnam", "sed", "omnis", "doloribus", "error", "ducimus", "rerum", "beatae", "cupiditate", "blanditiis", "labore"];
function ha(e2) {
  return n(() => {
    let a = r(da);
    var t2;
    return e2?.capitalize && (a = (t2 = a).charAt(0).toUpperCase() + t2.slice(1)), a;
  }, e2);
}
function ma(e2) {
  return n(() => `${ha()}.${ca()}`, e2);
}
var pa = ["Amaretto Sour", "Aviation", "Cocktail", "Gin", "Liqueur", "Bellini", "Brandy", "Black Russian", "Bourbon", "Coffee-flavored liqueur", "Coffee liqueur", "Cranberry Vodka", "Creme de Cacao", "Creme de Cassis", "Creme de Menthe", "Creme de Noyaux", "Bloody Mary", "Boulevardier", "Bronx Cocktail", "Clover Club", "Cosmopolitan", "Cuba Libre", "Daiquiri", "Dark and Stormy", "French 75", "Gin and Tonic", "Godfather", "B52", "Greyhound", "Harvey Wallbanger", "Irish Coffee", "Jack Rose", "Kamikaze", "Martini", "Martini Bianco", "Long Island", "Long Island Ice Tea", "Mai Tai", "Margarita", "Mimosa", "Mint Julep", "Negroni", "Mojito", "Still Water", "Sprinkled Water", "White Lady", "Negroni", "Champagne", "Red Wine", "White Wine", "Rum", "Rum and Coke", "Rum Punch", "Pina Colada", "Sangria", "Sazerac", "Tequila", "Tequila Sunrise", "Zombie", "Thai Spring Mojito", "Thai Basil Martini", "Screwdriver", "Raspberry Lemon Drop", "Orange Soda", "Pineapple Gingerale", "Pomegranate Cranberry", "Natural Vanilla Syrup", "Orange Liqueur", "Peach Schnapps", "Peppermint Schnapps", "Pineapple Juice", "Pineapple Soda", "Passion Fruit Pucker"];
function ya(e2) {
  return n(pa, e2);
}
var ga = ["aim", "alice", "aliceadsl", "aol", "arcor", "att", "bellsouth", "bigpond", "bluewin", "blueyonder", "bol", "centurytel", "charter", "chello", "club-internet", "comcast", "earthlink", "facebook", "free", "freenet", "frontiernet", "gmail", "gmx", "googlemail", "hetnet", "home", "hotmail", "ig", "juno", "laposte", "libero", "live", "mac", "mail", "me", "msn", "neuf", "ntlworld", "optonline", "optusnet", "orange", "outlook", "planet", "qq", "rambler", "rediffmail", "rocketmail", "sbcglobal", "sfr", "shaw", "sky", "skynet", "sympatico", "t-online", "telenet", "terra", "tin", "tiscali", "unaref", "uol", "verizon", "virgilio", "voila", "wanadoo", "web", "windstream", "yahoo", "yandex", "zonnet"];
function fa(e2) {
  return n(ga, e2);
}
var ba = { withAccents: { male: ["Adrián", "Ægir", "Álvaro", "André", "Andrés", "Árni", "Asbjørn", "Björn", "César", "Daníel", "Davíð", "Emílio", "Fañch", "François", "František", "Gísli", "Götz", "Guðjón", "Guðmundur", "Günter", "Halldór", "Hans-Jörg", "Hans-Jürgen", "Hüseyin", "Iñaki", "János", "Jesús", "Jiří", "Jóhann", "Jóhannes", "Jokūbas", "Jón", "José", "Jörn", "Julião", "Jürgen", "Kristján", "Maël", "Magnús", "Mathéo", "Mátyás", "Michał", "Noël", "Nuñez", "Ólafur", "Óscar", "Øyvind", "Páll", "Paweł", "Pétur", "Ramón", "Raúl", "René", "Ruairí", "Rubén", "Seán", "Sérgio", "Sigurður", "Sönke", "Stefán", "Tomáš", "Þorsteinn"], female: ["Ædel", "Agnès", "Alícia", "Änne", "Antónia", "Ásta", "Auður", "Cäcilia", "Chloë", "Claúdia", "Dörte", "Elín", "Elísabet", "Eliška", "Františka", "Glória", "Grażyna", "Guðbjörg", "Guðný", "Guðrún", "Henriëtte", "Ingibjörg", "Íris", "Jóhanna", "Jóna", "Júlia", "Käte", "Katrín", "Kolbrún", "Kristín", "KŠthe", "Letícia", "Lídia", "Lúcia", "Małgorzata", "Margrét", "María", "Mónica", "Natália", "Ólöf", "Patrícia", "Ragnheiður", "Renée", "Ružena", "Siân", "Sigríður", "Sigrún", "Sílvia", "Sørina", "Věra", "Virgínia", "Zoë", "Þóra", "Þórunn"] }, withoutAccents: { male: ["Abdul", "Abdullahi", "Abubakar", "Adam", "Adamu", "Adiy", "Ahmad", "Ajay", "Akira", "Alan", "Alberto", "Alejandro", "Aleksander", "Aleksandr", "Aleksey", "Alex", "Alexander", "Alexey", "Ali", "Aliyu", "Aminu", "Amit", "Amiyr", "Amiyt", "Amnuai", "Amphon", "Anah", "Anan", "Andreas", "Andrew", "Andrey", "Andri", "Andries", "Andrzej", "Anil", "Anthony", "Anton", "Antonio", "Arnar", "Artur", "Artyom", "Arun", "Ashok", "Atli", "Avraham", "Bartosz", "Bello", "Bernd", "Bin", "Birgir", "Bjarni", "Blessing", "Bongani", "Brian", "Bunmi", "Carlos", "Carol", "Chan", "Chao", "Charles", "Charoen", "Chen", "Cheng", "Christian", "Christopher", "Colin", "Daniel", "Daniyel", "Dariusz", "David", "Denis", "Dennis", "Diego", "Dieter", "Dilip", "Dinesh", "Dmitriy", "Dmitry", "Einar", "Eliyahu", "Emmanuel", "Evgeniy", "Fernando", "Fran", "Francis", "Francisco", "Francisco-Javier", "Frank", "Franz", "Gang", "Gareth", "Gary", "George", "Gerhard", "Graham", "Grzegorz", "Gunnar", "Guy", "Haim", "Haiyan", "Hans", "Hans-Ulrich", "Haruna", "Hassan", "Heike", "Heinz", "Helgi", "Helmut", "Hendrik", "Herbert", "Hideo", "Hiromi", "Hiroshi", "Hong", "Horst", "Hui", "Ian", "Ibrahim", "Idris", "Igor", "Ilya", "Isa", "Isaac", "Isah", "Ivan", "Jabulani", "Jacek", "Jacobus", "Jakub", "James", "Jan", "Janusz", "Javier", "Jean", "Jerzy", "Jesus", "Jason", "Jianguo", "Jianhua", "Jianjun", "Jianping", "Jin", "Joan", "Johan", "Johannes", "John", "Jonathan", "Jorge", "Jose", "Jose-Antonio", "Jose-Luis", "Jose-Manuel", "Jose-Maria", "Josef", "Joseph", "Joyce", "Juan", "Kabiru", "Kai", "Kamil", "Karen", "Karl", "Karl-Heinz", "Katsumi", "Kazuo", "Kelvin", "Kenji", "Kenneth", "Kevin", "Kiran", "Kirill", "Kiyoshi", "Kjartan", "Klaus", "Ko", "Koichi", "Koji", "Konstantin", "Koshi", "Krishna", "Kristinn", "Krzysztof", "Kun", "Lakshmi", "Lan", "Laxmi", "Lei", "Li", "Lihua", "Lijun", "Lilian", "Lin", "Ling", "Liping", "Liyor", "Luis", "Lukasz", "Maciej", "Mahmood", "Maksim", "Manfred", "Manoj", "Manuel", "Marcin", "Mardkhay", "Marek", "Mariusz", "Mark", "Martin", "Masami", "Masao", "Mateusz", "Matt", "Matthew", "Meiyr", "Michael", "Michal", "Miguel", "Miguel-Angel", "Mikhail", "Min", "Ming", "Mitsuo", "Miykhael", "Miykhal", "Mo", "Mohamed", "Mohammad", "Mohammed", "Mohan", "Moses", "Moshe", "Mpho", "Muhammad", "Muhammed", "Mukesh", "Musa", "Narong", "Nathan", "Nicola", "Nikita", "Nikolay", "Ning", "Nkosinathi", "Noam", "Oleg", "Omer", "Otieno", "Pablo", "Patrick", "Paul", "Pavel", "Pawel", "Pedro", "Peng", "Peter", "Petrus", "Philip", "Pieter", "Ping", "Piotr", "Prasit", "Prasoet", "Pricha", "Pushpa", "Qiang", "Qing", "Radha", "Rafael", "Ragnar", "Raj", "Rajendra", "Rajesh", "Raju", "Rakesh", "Ram", "Ramesh", "Raphael", "Rattana", "Ravi", "Richard", "Robert", "Roman", "Rong", "Roy", "Ryan", "Salisu", "Saman", "Samran", "Samuel", "Sani", "Sanjay", "Santosh", "Sam", "Sammy", "Sawat", "Sebastian", "Sergey", "Sergio", "Shankar", "Shay", "Shigeru", "Shimon", "Shlomo", "Shoji", "Sibusiso", "Simon", "Sipho", "Sombat", "Sombun", "Somchai", "Somchit", "Somkhit", "Somkiat", "Sommai", "Somnuek", "Somphon", "Somphong", "Somsak", "Sri", "Stefan", "Stephen", "Steve", "Steven", "Suman", "Sunday", "Sunil", "Sunthon", "Suresh", "Sushila", "Suwit", "Sveinn", "Tadashi", "Takashi", "Takeshi", "Tal", "Tebogo", "Thabo", "Thawi", "Themba", "Thomas", "Thulani", "Tomasz", "Toshio", "Udom", "Umar", "Uriy", "Usman", "Uwe", "Victor", "Vijay", "Viktor", "Vincent", "Vinod", "Vladimir", "Walter", "Wanchai", "Waraphon", "Wei", "Werner", "Wichai", "Wichian", "Willem", "William", "Winai", "Wirat", "Wirot", "Wojciech", "Wolfgang", "Xiang", "Xiaohong", "Xiaoli", "Xiaoping", "Xiaoyan", "Xin", "Xolani", "Yaakv", "Yahaya", "Yakubu", "Yan", "Yasuo", "Yhudah", "Ying", "Yisrael", "Yong", "Yosef", "Yoshie", "Yoshimi", "Yoshio", "Yu", "Yue", "Yukio", "Yun", "Yuriy", "Yusuf", "Yuval", "Zbigniew", "Zhen", "Zhiqiang"], female: ["Agata", "Agnieszka", "Aisha", "Akira", "Aleksandra", "Alina", "Alyona", "Amina", "Amnuai", "Ana", "Ana-Maria", "Anah", "Anan", "Anastasiya", "Andrea", "Angela", "Anita", "Ann", "Anna", "Anong", "Antonia", "Asha", "Barbara", "Beata", "Berglind", "Bin", "Birgit", "Birna", "Blessing", "Brigitte", "Bunmi", "Busisiwe", "Carmen", "Carol", "Caroline", "Catherine", "Chan", "Chanah", "Chao", "Charoen", "Chayah", "Chen", "Cheng", "Christa", "Christine", "Claire", "Claudia", "Cristina", "Darya", "Dolores", "Dorota", "Edda", "Ekaterina", "Elena", "Elisabeth", "Elizabeth", "Elke", "Emiko", "Emma", "Erika", "Erla", "Erna", "Ester", "Esther", "Eunice", "Eva", "Eugenia", "Ewa", "Faith", "Fatima", "Fiona", "Fran", "Francisca", "Fumiko", "Galina", "Gabra", "Gisela", "Gita", "Grace", "Hadiza", "Haiyan", "Hanna", "Haruna", "Hauwa", "Heike", "Helen", "Helga", "Hildur", "Hiroko", "Hiromi", "Hisako", "Hong", "Hui", "Hulda", "Inga", "Ingrid", "Irina", "Isa", "Isabel", "Isah", "Iwona", "Jackline", "Jan", "Jane", "Janet", "Jean", "Jennifer", "Jianhua", "Jianping", "Jin", "Joan", "Joanna", "Johanna", "Josefa", "Joy", "Joyce", "Juan", "Julie", "Justyna", "Kai", "Kanchana", "Karen", "Karin", "Karolina", "Kasia", "Katarzyna", "Katsumi", "Keiko", "Kiran", "Kiyoko", "Kristina", "Kseniya", "Kun", "Lakshmi", "Lalita", "Lan", "Latda", "Laura", "Laxmi", "Leah", "Lei", "Li", "Lihua", "Lijun", "Lilian", "Lilja", "Lin", "Linda", "Lindiwe", "Ling", "Liping", "Lisa", "Lucia", "Lucy", "Lyubov", "Lyudmila", "Magda", "Magdalena", "Mali", "Manju", "Margaret", "Maria", "Maria-Isabel", "Maria-Jose", "Maria-Pilar", "Marina", "Mariya", "Marta", "Martha", "Mary", "Maryam", "Masako", "Masami", "Mei", "Mercy", "Michal", "Michiko", "Mieko", "Min", "Mina", "Ming", "Miriam", "Miyoko", "Mo", "Monika", "Mpho", "Na", "Nadezhda", "Nan", "Nancy", "Natalya", "Ngozi", "Nicola", "Ning", "Nittaya", "Noam", "Nobuko", "Nokuthula", "Nonhlanhla", "Noriko", "Nushi", "Olga", "Omer", "Patricia", "Paula", "Paulina", "Peng", "Petra", "Phonthip", "Pilar", "Ping", "Prani", "Purity", "Pushpa", "Qing", "Rachel", "Radha", "Rattana", "Rebecca", "Reiko", "Rekha", "Renate", "Rita", "Rong", "Rosa", "Rose", "Rut", "Ruth", "Ryoko", "Sabine", "Sachiko", "Samran", "Santosh", "Sara", "Sarah", "Sam", "Sammy", "Sawat", "Shanti", "Sharon", "Shay", "Shizuko", "Shoshanah", "Sibongile", "Sita", "Sombat", "Sombun", "Somchit", "Somkhit", "Sommai", "Somnuek", "Somphon", "Somphong", "Sri", "Steinunn", "Sukanya", "Suman", "Sunday", "Sunita", "Suphaphon", "Susan", "Susanne", "Sushila", "Svetlana", "Takako", "Tamar", "Tatyana", "Tal", "Tebogo", "Teruko", "Thawi", "Tomiko", "Toshiko", "Unnur", "Urai", "Urmila", "Ursula", "Usha", "Valentina", "Victoria", "Wanjiru", "Wanphen", "Watsana", "Wei", "Wilai", "Xiang", "Xiaohong", "Xiaoli", "Xiaoping", "Xiaoyan", "Xin", "Yael", "Yan", "Yasuko", "Yelena", "Yhudiyt", "Ying", "Yoko", "Yong", "Yoshie", "Yoshiko", "Yoshimi", "Yu", "Yue", "Yuko", "Yuliya", "Yun", "Yuval", "Zainab", "Zandile", "Zanele", "Zhen"] } };
function wa(e2, a) {
  return n(e2, a);
}
function va(e2) {
  const a = e2?.withAccents ?? false, t2 = e2?.gender ?? wa(["male", "female"]), i2 = e2?.locale || ba;
  return n(a ? i2.withAccents[t2] : i2.withoutAccents[t2], e2);
}
var ka = { withAccents: ["Æbelø", "Æbeltoft", "Ágústsdóttir", "Ágústsson", "Álvarez", "Árnadóttir", "Árnason", "Ásgeirsdóttir", "Ãshaikh", "Beneš", "Benešová", "Baldursdóttir", "Birgisdóttir", "Bjarnadóttir", "Björnsdóttir", "Björnsson", "Böttcher", "Černá", "Černý", "Chávez", "Ðekić", "Díaz", "Ðorðić", "Dvořák", "Dvořáková", "Einarsdóttir", "Fernández", "Fialová", "Förster", "Friðriksson", "Fröhlich", "García", "Gísladóttir", "Gíslason", "Göbel", "Gómez", "Groß", "Gunnarsdóttir", "Guðjónsdóttir", "Guðjónsson", "Guðmundsdóttir", "Guðmundsson", "Günther", "Halldórsdóttir", "Halldórsson", "Gutiérrez", "Guzmán", "Hájek", "Haraldsdóttir", "Harðardóttir", "Harðarson", "Helgadóttir", "Hernández", "Hauksdóttir", "Horák", "Horáková", "Jabłoński", "Jäger", "Jasiński", "Jiménez", "Jóhannesdóttir", "Jóhannesson", "Jóhannsdóttir", "Jóhannsson", "Jónasdóttir", "Jónasson", "Jónsdóttir", "Jónsson", "Kamiński", "Karlsdóttir", "Kjartansdóttir", "Köhler", "König", "Kozłowski", "Králová", "Krejčí", "Kristinsdóttir", "Kristjánsdóttir", "Kristjánsson", "Krüger", "Kučera", "Kučerová", "Łapiński", "Löffler", "López", "Łuczak", "Łukaszewski", "Magnúsdóttir", "Magnússon", "Marková", "Martínez", "Meißner", "Méndez", "Möller", "Müller", "Muñoz", "Novák", "Nováková", "Novotná", "Novotný", "Nuñez", "Núñez", "Ødegård", "Őhlschlägerová", "Ólafsdóttir", "Ólafsson", "Őllösová", "Olszewski", "Őri", "Őrségi-Zölderdő", "Óskarsdóttir", "Óskarsson", "Øvergård", "Őzse", "Pálsdóttir", "Pálsson", "Pawłowski", "Peña", "Pérez", "Pétursdóttir", "Pétursson", "Pokorná", "Pokorný", "Pospíšil", "Pospíšilová", "Procházka", "Procházková", "Ragnarsdóttir", "Ramírez", "Ríos", "Rodríguez", "Sánchez", "Schäfer", "Schröder", "Schütz", "Sigurðardóttir", "Sigurðsson", "Sigurjónsdóttir", "Sigurjónsson", "Sokołowski", "Stefánsdóttir", "Stefánsson", "Sveinsdóttir", "Svobodová", "Szczepański", "Szymański", "Urbański", "Ūsas", "Ūžien", "Vásquez", "Veselá", "Veselý", "Weiß", "Żak", "Žáková", "Zemanová", "Zieliński", "Žukauskas", "Žukauskienė", "Þórðardóttir", "Þórðarson", "Þorsteinsdóttir", "Þorsteinsson"], withoutAccents: ["Abdi", "Abdullahi", "Abe", "Abubakar", "Achieng", "Adamczyk", "Adamu", "Adan", "Adebayo", "Adhiambo", "Adri", "Agbaria", "Aguilar", "Ahmad", "Ahmed", "Akinyi", "Akpan", "Ali", "Aliev", "Aliyu", "Allen", "Alonso", "Alvarez", "Amadi", "Aminu", "Andreev", "Andreeva", "Ansari", "Anyango", "Aoki", "Arai", "Arnarson", "Ashknaziy", "Atieno", "Attias", "Audu", "Avraham", "Ayutthaya", "Azulay", "Baba", "Bai", "Bailey", "Baker", "Bakker", "Bala", "Baldursson", "Baloyi", "Baran", "Barasa", "Barman", "Bauer", "Becker", "Begam", "Begum", "Behera", "Bekher", "Bello", "Bennett", "Ber", "Bevan", "Bibi", "Birgisson", "Biswas", "Bitton", "Bjarnason", "Blanco", "Blom", "Borkowski", "Bos", "Botha", "Bowen", "Braun", "Brouwer", "Brown", "Bunma", "Bunmi", "Bunsi", "Buthelezi", "Cai", "Cano", "Cao", "Carter", "Castillo", "Castro", "Cele", "Ceng", "Chaichana", "Chand", "Chanthara", "Chauke", "Chebet", "Chen", "Cheng", "Chepkemoi", "Cherinsuk", "Cheruiyot", "Chided", "Chmielewski", "Chukwu", "Clark", "Clarke", "Coetzee", "Cohen", "Collins", "Cook", "Cooper", "Cortes", "Cruz", "Cui", "Czarnecki", "Dahan", "Dai", "Das", "Dauda", "David", "Davies", "Davis", "Dayan", "De-Bruijn", "De-Graaf", "De-Groot", "De-Jong", "Dekker", "Delgado", "Deng", "Devi", "Diaz", "Dijkstra", "Ding", "Dlamini", "Dominguez", "Dong", "Du-Plessis", "Dube", "Duda", "Dudek", "Dumont", "Edwards", "Egorov", "Egorova", "Einarsson", "Elbaz", "Eliyahu", "Ellis", "Emmanuel", "Endo", "Espinoza", "Esteban", "Evans", "Eze", "Fan", "Fang", "Feldman", "Feng", "Fernandez", "Fiala", "Fischer", "Flores", "Friedman", "Frolova", "Fu", "Fuchs", "Fujii", "Fujita", "Fukuda", "Gaby", "Gao", "Garba", "Garcia", "Garrido", "Garza", "Ghosh", "Gil", "Golan", "Goldstein", "Gomez", "Gonzales", "Gonzalez", "Goto", "Govender", "Grabowski", "Green", "Greenberg", "Griffiths", "Gu", "Guerrero", "Gumede", "Gunnarsson", "Guo", "Gupta", "Gutierrez", "Hahn", "Hall", "Han", "Haraldsson", "Harle", "Harle-Cowan", "Harris", "Harrison", "Hartmann", "Haruna", "Hasegawa", "Hashimoto", "Hasna", "Hassan", "Hauksson", "Hayashi", "He", "Helgason", "Hen", "Hendriks", "Herbulot", "Hernandez", "Herrera", "Herrmann", "Hill", "Hoekstra", "Hoffmann", "Hofmann", "Hongthong", "Hopkins", "Howells", "Hu", "Huang", "Huber", "Hughes", "Huisman", "Hussein", "Ibrahim", "Idris", "Iglesias", "Igwe", "Ikeda", "Inoue", "Isa", "Isaac", "Isah", "Ishii", "Ishikawa", "Ito", "Ivanov", "Ivanova", "Jabarin", "Jackson", "Jacobs", "Jadhav", "Jakubowski", "James", "Jankowski", "Jansen", "Janssen", "Jaworski", "Jenkins", "Jia", "Jiang", "Jimenez", "Jin", "John", "Johnson", "Jones", "Joseph", "Juma", "Jung", "Kaczmarek", "Kaiser", "Kamau", "Karanja", "Kariuki", "Karlsson", "Kato", "Katz", "Kaur", "Keller", "Khan", "Khatib", "Khatoon", "Khatun", "Khoury", "Khoza", "Khumalo", "Kibet", "Kikuchi", "Kim", "Kimani", "Kimura", "King", "Kjartansson", "Klein", "Kobayashi", "Koch", "Koech", "Kok", "Kondo", "Kongkaeo", "Koster", "Kovalenko", "Kowalczyk", "Kowalski", "Kozlov", "Kozlova", "Krause", "Krawczyk", "Kristinsson", "Kubiak", "Kucharski", "Kuipers", "Kumar", "Kumari", "Kuznetsov", "Kuznetsova", "Kwiatkowski", "Lal", "Lang", "Langat", "Lange", "Lavyan", "Lawal", "Lebedeva", "Lee", "Lehmann", "Levy", "Lewandowski", "Lewis", "Li", "Liang", "Liao", "Lim", "Lin", "Lis", "Liu", "Llewellyn", "Lloyd", "Lopez", "Lozano", "Lu", "Luo", "Ma", "Maas", "Mabaso", "Macharia", "Maciejewski", "Maeda", "Magomedov", "Mahagna", "Mahato", "Mahlangu", "Mahto", "Maier", "Maina", "Majewski", "Makarov", "Makarova", "Malinowski", "Malkah", "Maluleke", "Mandal", "Marciniak", "Marek", "Marin", "Martin", "Martinez", "Masarweh", "Maseko", "Mathebula", "Matsumoto", "Matthews", "Mayer", "Mazibuko", "Mazur", "Mazurek", "Mbatha", "Medina", "Meier", "Meijer", "Mendoza", "Meng", "Meyer", "Mhamid", "Mhlongo", "Michalak", "Michalski", "Mikhaylov", "Mikhaylova", "Mishra", "Mitchell", "Mizrahi", "Mkhize", "Mofokeng", "Mohamed", "Mohammed", "Mokoena", "Molefe", "Molina", "Mondal", "Moore", "Mor", "Morales", "Moreno", "Morgan", "Mori", "Morozov", "Morozova", "Morris", "Moshe", "Mthembu", "Mthethwa", "Mtshali", "Muhammad", "Muhammadu", "Muhammed", "Mulder", "Murakami", "Musa", "Mustapha", "Muthoni", "Mutua", "Mutuku", "Mwangi", "Naidoo", "Nakajima", "Nakamura", "Nakano", "Navarro", "Nayak", "Ndlovu", "Nel", "Neumann", "Ngcobo", "Ngobeni", "Ngubane", "Nguyen", "Ngwenya", "Nikitina", "Nikolaev", "Nikolaeva", "Njeri", "Njoroge", "Njuguna", "Nkosi", "Novikov", "Novikova", "Nowak", "Nowakowski", "Nowicki", "Ntuli", "Nxumalo", "Nyambura", "Oakley", "Ochieng", "Odhiambo", "Ogawa", "Ohana", "Ohayon", "Ojo", "Okada", "Okafor", "Okeke", "Okon", "Okoro", "Okoth", "Omar", "Omer", "Omondi", "Ono", "Onyango", "Ortega", "Ortiz", "Ostrowski", "Ota", "Otieno", "Ouma", "Owen", "Owino", "Pal", "Pan", "Panya", "Paramar", "Parker", "Parry", "Paswan", "Patel", "Patil", "Pavlov", "Pavlova", "Pawlak", "Peeters", "Peng", "Peretz", "Perez", "Peter", "Peters", "Petrov", "Petrova", "Pfeiffer", "Phillips", "Photsi", "Pietrzak", "Pillay", "Piotrowski", "Popov", "Popova", "Powell", "Prasad", "Pretorius", "Price", "Prieto", "Prins", "Pritchard", "Pugh", "Qiu", "Rabiu", "Radebe", "Ragnarsson", "Ram", "Ramirez", "Ramos", "Rani", "Rathod", "Ray", "Rees", "Ren", "Reuben", "Reyes", "Richards", "Richardson", "Richter", "Rivera", "Roberts", "Robinson", "Rodriguez", "Rogers", "Romanov", "Romanova", "Romero", "Rosenberg", "Rotich", "Rowlands", "Roy", "Rubio", "Ruiz", "Rungrueang", "Rumbelow", "Rutkowski", "Sadowski", "Saeli", "Saelim", "Saengthong", "Saetan", "Saetang", "Saeueng", "Sah", "Saha", "Sahu", "Saidu", "Saito", "Sakai", "Sakamoto", "Salazar", "Salisu", "Samuel", "Sanchez", "Sangthong", "Sani", "Santiago", "Santos", "Sanz", "Sarkar", "Sasaki", "Sato", "Sawicki", "Schmid", "Schmidt", "Schmitt", "Schmitz", "Schneider", "Scholz", "Schouten", "Schulz", "Schulze", "Schwartz", "Schwarz", "Scott", "Segel", "Sekh", "Sergeeva", "Serrano", "Shaikh", "Shalom", "Shapiro", "Sharabi", "Sharma", "Shaw", "Shehu", "Shemesh", "Shevchenko", "Shi", "Shimizu", "Sibiya", "Sichantha", "Sikora", "Simiyu", "Singh", "Sisuk", "Sithole", "Sitwat", "Smee", "Smirnov", "Smirnova", "Smit", "Smith", "Smits", "Sokolov", "Sokolova", "Sombun", "Song", "Soto", "Smoakley", "Starr", "Stepanov", "Stepanova", "Su", "Suad", "Suarez", "Suissa", "Sukkasem", "Sulaiman", "Suleiman", "Sun", "Sunday", "Suwan", "Suzuki", "Sveinsson", "Svoboda", "Szewczyk", "Takahashi", "Takeuchi", "Tal", "Tan", "Tanaka", "Tang", "Taylor", "Thakur", "Thomas", "Thompson", "Thongdi", "Thongkham", "Thongsuk", "Tian", "Tomaszewski", "Torres", "Tshabalala", "Turner", "Udo", "Ueda", "Umar", "Umaru", "Usman", "Vaknin", "Valdez", "Van-Beek", "Van-Dam", "Van-den-Berg", "Van-der-Heijden", "Van-der-Linden", "Van-Dijk", "Vargas", "Vasilev", "Vasileva", "Vazquez", "Vega", "Venter", "Verhoeven", "Vermeulen", "Visser", "Volkov", "Volkova", "Vos", "Wafula", "Wagner", "Wairimu", "Walczak", "Walker", "Walter", "Walters", "Wambua", "Wambui", "Wang", "Wangui", "Wanjala", "Wanjiku", "Ward", "Watanabe", "Watkins", "Watson", "Weber", "Wei", "Wekesa", "Wen", "Werner", "White", "Wieczorek", "Wilk", "Willems", "Williams", "Wilson", "Witkowski", "Wojciechowski", "Wolf", "Wood", "Wright", "Wu", "Xiao", "Xie", "Xu", "Yaakv", "Yadav", "Yahaya", "Yakovleva", "Yakubu", "Yamada", "Yamaguchi", "Yamamoto", "Yamashita", "Yamazaki", "Yan", "Yang", "Yao", "Ye", "Yin", "Yosef", "Yoshida", "Young", "Yu", "Yuan", "Yusuf", "Zajac", "Zakharov", "Zakharova", "Zalewski", "Zawadzki", "Zaytseva", "Zhang", "Zhao", "Zheng", "Zhong", "Zhou", "Zhu", "Zimmermann", "Zoabi", "Zulu", "Zwane"] };
function Sa(e2) {
  const a = e2?.withAccents ?? v(), t2 = e2?.locale || ka;
  return n(a ? t2.withAccents : t2.withoutAccents, e2);
}
function Ca(e2) {
  return n(() => {
    const a = e2?.provider ?? fa(), t2 = function(e3) {
      let a2 = "";
      const t3 = e3?.firstName ?? va({ withAccents: false }), i2 = e3?.lastName ?? Sa({ withAccents: false });
      e3?.nameSeparator ? "none" !== e3.nameSeparator && (a2 = e3.nameSeparator) : a2 = n([".", "-", "_", "+", ""]);
      let o2 = `${t3} ${i2}`.replace(" ", a2);
      return v() && (o2 += k({ min: 1, max: 1e3 })), o2.toLowerCase();
    }(e2);
    return `${t2}@${a}.${e2?.suffix ?? ca()}`;
  }, e2);
}
var Aa = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "💋", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️‍🔥", "❤️‍🩹", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💣", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩", "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🧏", "🧏‍♂️", "🧏‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🥷", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵", "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🤱", "👩‍🍼", "👨‍🍼", "🧑‍🍼", "👼", "🎅", "🤶", "🧑‍🎄", "🦸", "🦸‍♂️", "🦸‍♀️", "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛", "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️", "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🧍", "🧍‍♂️", "🧍‍♀️", "🧎", "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "🕴️", "👯", "👯‍♂️", "👯‍♀️", "🧖", "🧖‍♂️", "🧖‍♀️", "🧗", "🧗‍♂️", "🧗‍♀️", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏌️‍♂️", "🏌️‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🏊", "🏊‍♂️", "🏊‍♀️", "⛹️", "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "🤼", "🤼‍♂️", "🤼‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🤾", "🤾‍♂️", "🤾‍♀️", "🤹", "🤹‍♂️", "🤹‍♀️", "🧘", "🧘‍♂️", "🧘‍♀️", "🛀", "🛌", "🧑‍🤝‍🧑", "👭", "👫", "👬", "💏", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", "💑", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", "👤", "👥", "🫂", "👣", "🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🪲", "🐞", "🦗", "🪳", "🕷️", "🕸️", "🦂", "🦟", "🪰", "🪱", "🦠", "💐", "🌸", "💮", "🏵️", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🫒", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🫓", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧋", "🧃", "🧉", "🧊", "🥢", "🍽️", "🍴", "🥄", "🔪", "🏺", "🌍", "🌎", "🌏", "🌐", "🗺️", "🗾", "🧭", "🏔️", "⛰️", "🌋", "🗻", "🏕️", "🏖️", "🏜️", "🏝️", "🏞️", "🏟️", "🏛️", "🏗️", "🧱", "🪨", "🪵", "🛖", "🏘️", "🏚️", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🛕", "🕍", "⛩️", "🕋", "⛲", "⛺", "🌁", "🌃", "🏙️", "🌄", "🌅", "🌆", "🌇", "🌉", "♨️", "🎠", "🎡", "🎢", "💈", "🎪", "🚂", "🚃", "🚄", "🚅", "🚆", "🚇", "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚍", "🚎", "🚐", "🚑", "🚒", "🚓", "🚔", "🚕", "🚖", "🚗", "🚘", "🚙", "🛻", "🚚", "🚛", "🚜", "🏎️", "🏍️", "🛵", "🦽", "🦼", "🛺", "🚲", "🛴", "🛹", "🛼", "🚏", "🛣️", "🛤️", "🛢️", "⛽", "🚨", "🚥", "🚦", "🛑", "🚧", "⚓", "⛵", "🛶", "🚤", "🛳️", "⛴️", "🛥️", "🚢", "✈️", "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰️", "🚀", "🛸", "🛎️", "🧳", "⌛", "⏳", "⌚", "⏰", "⏱️", "⏲️", "🕰️", "🕛", "🕧", "🕐", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", "🕗", "🕣", "🕘", "🕤", "🕙", "🕥", "🕚", "🕦", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌙", "🌚", "🌛", "🌜", "🌡️", "☀️", "🌝", "🌞", "🪐", "⭐", "🌟", "🌠", "🌌", "☁️", "⛅", "⛈️", "🌤️", "🌥️", "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "🌬️", "🌀", "🌈", "🌂", "☂️", "☔", "⛱️", "⚡", "❄️", "☃️", "⛄", "☄️", "🔥", "💧", "🌊", "🎃", "🎄", "🎆", "🎇", "🧨", "✨", "🎈", "🎉", "🎊", "🎋", "🎍", "🎎", "🎏", "🎐", "🎑", "🧧", "🎀", "🎁", "🎗️", "🎟️", "🎫", "🎖️", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "⚾", "🥎", "🏀", "🏐", "🏈", "🏉", "🎾", "🥏", "🎳", "🏏", "🏑", "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "🥅", "⛳", "⛸️", "🎣", "🤿", "🎽", "🎿", "🛷", "🥌", "🎯", "🪀", "🪁", "🎱", "🔮", "🪄", "🧿", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🪅", "🪆", "♠️", "♥️", "♦️", "♣️", "♟️", "🃏", "🀄", "🎴", "🎭", "🖼️", "🎨", "🧵", "🪡", "🧶", "🪢", "👓", "🕶️", "🥽", "🥼", "🦺", "👔", "👕", "👖", "🧣", "🧤", "🧥", "🧦", "👗", "👘", "🥻", "🩱", "🩲", "🩳", "👙", "👚", "👛", "👜", "👝", "🛍️", "🎒", "🩴", "👞", "👟", "🥾", "🥿", "👠", "👡", "🩰", "👢", "👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑️", "📿", "💄", "💍", "💎", "🔇", "🔈", "🔉", "🔊", "📢", "📣", "📯", "🔔", "🔕", "🎼", "🎵", "🎶", "🎙️", "🎚️", "🎛️", "🎤", "🎧", "📻", "🎷", "🪗", "🎸", "🎹", "🎺", "🎻", "🪕", "🥁", "🪘", "📱", "📲", "☎️", "📞", "📟", "📠", "🔋", "🔌", "💻", "🖥️", "🖨️", "⌨️", "🖱️", "🖲️", "💽", "💾", "💿", "📀", "🧮", "🎥", "🎞️", "📽️", "🎬", "📺", "📷", "📸", "📹", "📼", "🔍", "🔎", "🕯️", "💡", "🔦", "🏮", "🪔", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "📓", "📒", "📃", "📜", "📄", "📰", "🗞️", "📑", "🔖", "🏷️", "💰", "🪙", "💴", "💵", "💶", "💷", "💸", "💳", "🧾", "💹", "✉️", "📧", "📨", "📩", "📤", "📥", "📦", "📫", "📪", "📬", "📭", "📮", "🗳️", "✏️", "✒️", "🖋️", "🖊️", "🖌️", "🖍️", "📝", "💼", "📁", "📂", "🗂️", "📅", "📆", "🗒️", "🗓️", "📇", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "🖇️", "📏", "📐", "✂️", "🗃️", "🗄️", "🗑️", "🔒", "🔓", "🔏", "🔐", "🔑", "🗝️", "🔨", "🪓", "⛏️", "⚒️", "🛠️", "🗡️", "⚔️", "🔫", "🪃", "🏹", "🛡️", "🪚", "🔧", "🪛", "🔩", "⚙️", "🗜️", "⚖️", "🦯", "🔗", "⛓️", "🪝", "🧰", "🧲", "🪜", "⚗️", "🧪", "🧫", "🧬", "🔬", "🔭", "📡", "💉", "🩸", "💊", "🩹", "🩺", "🚪", "🛗", "🪞", "🪟", "🛏️", "🛋️", "🪑", "🚽", "🪠", "🚿", "🛁", "🪤", "🪒", "🧴", "🧷", "🧹", "🧺", "🧻", "🪣", "🧼", "🪥", "🧽", "🧯", "🛒", "🚬", "⚰️", "🪦", "⚱️", "🗿", "🪧", "🏧", "🚮", "🚰", "♿", "🚹", "🚺", "🚻", "🚼", "🚾", "🛂", "🛃", "🛄", "🛅", "⚠️", "🚸", "⛔", "🚫", "🚳", "🚭", "🚯", "🚱", "🚷", "📵", "🔞", "☢️", "☣️", "⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️", "↕️", "↔️", "↩️", "↪️", "⤴️", "⤵️", "🔃", "🔄", "🔙", "🔚", "🔛", "🔜", "🔝", "🛐", "⚛️", "🕉️", "✡️", "☸️", "☯️", "✝️", "☦️", "☪️", "☮️", "🕎", "🔯", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "⛎", "🔀", "🔁", "🔂", "▶️", "⏩", "⏭️", "⏯️", "◀️", "⏪", "⏮️", "🔼", "⏫", "🔽", "⏬", "⏸️", "⏹️", "⏺️", "⏏️", "🎦", "🔅", "🔆", "📶", "📳", "📴", "♀️", "♂️", "⚧️", "✖️", "➕", "➖", "➗", "♾️", "‼️", "⁉️", "❓", "❔", "❕", "❗", "〰️", "💱", "💲", "⚕️", "♻️", "⚜️", "🔱", "📛", "🔰", "⭕", "✅", "☑️", "✔️", "❌", "❎", "➰", "➿", "〽️", "✳️", "✴️", "❇️", "©️", "®️", "™️", "#️⃣", "*️⃣", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔠", "🔡", "🔢", "🔣", "🔤", "🅰️", "🆎", "🅱️", "🆑", "🆒", "🆓", "ℹ️", "🆔", "Ⓜ️", "🆕", "🆖", "🅾️", "🆗", "🅿️", "🆘", "🆙", "🆚", "🈁", "🈂️", "🈷️", "🈶", "🈯", "🉐", "🈹", "🈚", "🈲", "🉑", "🈸", "🈴", "🈳", "㊗️", "㊙️", "🈺", "🈵", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜", "◼️", "◻️", "◾", "◽", "▪️", "▫️", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "💠", "🔘", "🔳", "🔲", "🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫", "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲", "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇩🇪", "🇩🇬", "🇩🇯", "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺", "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷", "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭", "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇭🇰", "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶", "🇮🇷", "🇮🇸", "🇮🇹", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵", "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳", "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹", "🇱🇺", "🇱🇻", "🇱🇾", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲", "🇲🇳", "🇲🇴", "🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺", "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿", "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇴🇲", "🇵🇦", "🇵🇪", "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼", "🇵🇾", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇸🇦", "🇸🇧", "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬", "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽", "🇸🇾", "🇸🇿", "🇹🇦", "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳", "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿", "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇼🇫", "🇼🇸", "🇽🇰", "🇾🇪", "🇾🇹", "🇿🇦", "🇿🇲", "🇿🇼", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "🏴󠁧󠁢󠁷󠁬󠁳󠁿"];
function Ma(e2) {
  return n(Aa, e2);
}
var Ta = ["0x958aa9ddbd62f989dec2fd1468bf436aebeb8be6", "0x9a7a3607dc4617deff6d4f9ca5d8c0beba0cffc5", "0xf5dcc57cb74623d2b3bfa6be9d96902f4bacb0b4", "0xfeff5fc09fc64ddde1cb09cdbba9d5aa1bd60028", "0xbf7aa2fdfdc0a971427bc7a815eabe4f37f53c19", "0xba0cbdbda3e1fafd9ba9b1b638d9eea0f8b9d7da", "0xeac476af2cdd3d5bbd723759073db20fe987f7bc", "0x5cef0214f4ebecaeb0a34088f4169dc2dbbf3ddb", "0x3be4ca88dda4aede8b2cf4cdf80878daecfd97d0", "0x5a367fae4dae00e05d6b3ce19d4fadec4da5dffe", "0xbae7b517fdd077edfefffafbd6ffdec6a95413ac", "0xdbcebff49e6f9c8ddb764b5a68b7ba2fdf555c2e", "0xf7aea0ce7ab75bbbeabf83a35b6631124e1b01de", "0xbf53ee26d8dddcccda95b373ad8ce0ebdbb00cfd", "0xd97be3baebea30eedc318e82befd7b451fdca1ce", "0xa69ea3e7eb2937dbc56f1b93dbabbbe7484108d5", "0x46270faac76c1dcb9ea78bfc75d84b82b928962b", "0xeda7bd82aa45cb6f6ddc92ff432b9f1fc970cf6f"];
function Ba(e2) {
  return n(Ta, e2);
}
var Ia = ["aiff", "deb", "utz", "mpeg", "itp", "qxb", "mmf", "fbs", "aam", "link66", "mmr", "clkw", "vis", "eol", "cii", "ini", "uvd", "uvx", "kwd", "gqf", "onetoc2", "man", "z2", "urls", "ots", "cpp", "pub", "csp", "rdf", "list", "sfd-hdstx", "u32", "xhtml", "vxml", "ecma", "swi", "cpt", "gramps", "mb", "pre", "rs", "dts", "nnd", "atom", "pas", "uvvi", "p7b", "ptid", "djvu", "cmp", "msl", "oa2", "flw", "pcurl", "azs", "ssdl", "dotx", "mrcx", "ssf", "m3u", "onetoc", "w3d", "tpt", "mft", "yin", "ogg", "jsonml", "fst", "acc", "x3dvz", "mads", "sxg", "str", "ppsm", "pfx", "vsw", "irp", "meta4", "tex", "clkx", "chrt", "txt", "msf", "wvx", "et3", "bdm", "ods", "3ds", "smi", "skm", "t3", "asm"];
function Pa(e2) {
  return n(Ia, e2);
}
var xa = ["/opt/bin/turn_key_bedfordshire_contingency.mts.acu", "/lib/niches_account_springs.w3d.gtm", "/Applications/plains_fresh_hack.s.onepkg", "/usr/libexec/gold_plum_toys.mbk.xdf", "/net/green_terrace_faroe.csh.wspolicy", "/net/monitor_saint_engineer.mrc.ogv", "/usr/lib/dong.gsf.dxr", "/usr/include/rand_sleek.uvs.qxt", "/usr/buckinghamshire.pdb.so", "/tmp/soft.fxp.dist", "/lost+found/producer_metal_networked.spot.ktz", "/lost+found/gorgeous_plastic.z1.dwf", "/usr/sbin/car.cba.dssc", "/Applications/responsive_mobile.twds.markdown", "/usr/share/copying.scq.teacher", "/bin/neural_net.btif.php", "/lost+found/sudanese.sm.m1v", "/usr/local/bin/compressing_bifurcated.crd.oda", "/etc/mail/uzbekistan_invoice_analyzer.lostxml.xht", "/usr/local/bin/turn_key.uvv.mng", "/usr/share/moldova_loan_administration.pvb.xaml", "/opt/include/frozen.z2.pnm", "/opt/bin/recontextualize_optimization.onetoc.opf", "/rescue/director_grocery.gml.nns", "/opt/bin/adp_keyboard.mcd.prf", "/Users/table_leading.ufd.aas", "/usr/include/avon_best_of_breed.tga.xif", "/etc/periodic/compatible.icm.pcf", "/var/log/withdrawal.sdc.aep", "/var/yp/tasty_silver_idaho.cbr.uvf", "/etc/periodic/web_readiness_international_licensed.lwp.xlf", "/var/spool/future_organic.bpk.wtb", "/home/account_cotton.xap.jpe", "/etc/mail/strategist.ngdat.mcd", "/lib/transmit_awesome.cba.flx", "/home/software.spc.dd2", "/rescue/sticky.asc.ots", "/usr/bin/fish_islands_estates.fdf.aif", "/usr/sbin/optimization_multi_tasking.hvp.mcd", "/etc/ppp/steel.cdf.mp4", "/etc/gorgeous_mews.pml.ppam", "/usr/lib/metrics.smzip.hpid", "/System/hacking.sass.sxg", "/home/user/gloves_grey.ami.svg", "/usr/include/overriding_png.txt.aw", "/lost+found/designer_decentralized.tcl.m4u", "/etc/namedb/de_engineered_bandwidth.igx.avi", "/opt/include/christmas.mp2a.vob", "/usr/X11R6/producer_deliver.txd.rtx", "/net/exploit_smtp.kpxx.qwd", "/private/var/azure_pine_iranian.rif.cst", "/Library/virtual.bdoc.ief", "/usr/bin/drive.hpid.joda", "/etc/namedb/account_parsing.bcpio.mj2", "/lib/configuration_programming.fly.nfo", "/usr/include/maryland_enterprise_wide_tuna.rmvb.mk3d", "/srv/back_end.java.mp3", "/rescue/trace_cotton_synergized.pgm.mpt", "/var/mail/incredible.elc.setreg", "/usr/share/avon_state.onepkg.dwg", "/usr/lib/composite_maryland.md.psd", "/lib/ports_calculating.ogg.wm", "/Network/embrace_interactions_internal.mng.lasxml", "/Users/mobility_avon_internal.mpp.cxx", "/home/smtp_keys_serbian.cbt.f90", "/boot/defaults/index_avon.stl.dxp", "/var/computers_bedfordshire.mp2.ami", "/etc/zimbabwe.html.crx", "/usr/share/alarm.vob.wmls", "/etc/namedb/calculate.cbz.gqs", "/usr/ports/experiences.uvvz.ifm", "/home/user/regional_gold.p8.silo", "/System/avon_representative_bandwidth_monitored.nlu.ez3", "/selinux/gardens.dwg.aiff", "/Library/direct.link66.ktx", "/sys/agp_borders_channels.uu.roa", "/opt/share/computer_indigo.sfs.x3dv", "/srv/payment_invoice.ppd.irm", "/usr/local/bin/indexing_health_tactics.fe_launch.sgl", "/sbin/online_technician.vcd.zmm", "/var/tmp/soap_cambridgeshire_regional.au.xps", "/opt/share/singapore.elc.hps", "/root/solutions_logistical.npx.kmz", "/sbin/system_contingency.xspf.pgp", "/root/dakota.pfa.xps", "/usr/X11R6/savings_expressway.json.uvf", "/usr/ports/intermediate_avon_soft.mml.xfdf", "/etc/namedb/won_fresh.et3.aam", "/dev/hacking.caf.vcd", "/sys/gorgeous_payment.skm.htm", "/Applications/niches.x3d.atom", "/Applications/website.pgp.clkp", "/etc/mail/barbados_azure.gre.php", "/var/tasty.cfs.uvvt", "/usr/src/real.box.gif", "/opt/include/engineer.qxd.xpw", "/opt/sbin/synthesizing_investor.ra.c4d", "/etc/defaults/incredible.spc.edm", "/usr/src/rufiyaa.odp.ace", "/usr/local/bin/tactics_maryland_xml.zip.gram"];
function Da(e2) {
  return n(xa, e2);
}
var Ga = ["model", "x-conference", "x-shader", "video", "application", "message", "multipart", "font", "audio", "image", "chemical", "text"];
function Fa(e2) {
  return n(Ga, e2);
}
var qa = ["Araucanian herring", "Pacific saury", "Indian oil sardine", "Nile tilapia", "Bombay-duck", "Japanese common catfish", "Whiteleg shrimp", "Haddock", "Chilean jack mackerel", "Pollock", "Southern rough shrimp", "Amur catfish", "Largehead hairtail", "Gazami crab", "Silver carp", "Blue whiting", "Pacific thread herring", "Pacific anchoveta"];
function La(e2) {
  return n(qa, e2);
}
function Ra(e2) {
  const a = __spreadProps(__spreadValues({}, e2), { fraction: e2?.fraction ?? 2 });
  return n(function() {
    return s(a);
  }, e2);
}
var Ea = ["Inter", "DM Sans", "Space Mono", "Space Grotesk", "Work Sans", "Syne", "Libre Franklin", "Cormorant", "Fira Sans", "Eczar", "Alegreya Sans", "Alegreya", "Source Sans Pro", "Source Serif Pro", "Roboto", "Roboto Slab", "BioRhyme", "Inknut Antiqua", "Poppins", "Archivo Narrow", "Libre Baskerville", "Playfair Display", "Karla", "Lora", "Proza Libre", "Spectral", "IBM Plex Sans", "Crimson Text", "Montserrat", "Lato", "PT Sans", "PT Serif", "Cardo", "Chivo", "Neuton", "Rubik", "Open Sans", "Inconsolata", "Raleway", "Merriweather"];
function Ha(e2) {
  return n(Ea, e2);
}
function Wa(e2) {
  return n(() => `${k({ min: 0, max: 2e3, fraction: 2 })}${e2?.suffix ?? "px"}`, e2);
}
var Na = { china: ["Peking roasted duck", "Kung pao chicken", "Sweet and sour pork", "Hot pot", "Dim sum", "Dumplings", "Ma po tofu", "Char siu", "Chicken chow mein", "Beef chow mein", "vegetable chow mein", "Chicken fried rice", "Beef fried rice", "Vegetable fried Rice", "Special fried Rice", "Sichuan pork", "Xiaolongbao", "Zhajiangmian", "Wonton soup", "Sweet and sour pork", "Duck spring Rolls", "Vegetable spring Rolls", "Wonton", "Peking duck", "Lamb hot pot", "Spicy crayfish", "Guilin rice noodles", "Lanzhou hand-pulled noodles", "Steamed crab", "Shredded pork with garlic sauce", "Red braised pork", "Sweet and sour Ribs", "Xinjiang", "Braised pork with vermicelli"], italy: ["Butternut squash risotto", "Mushroom risotto", "Beetroot risotto", "Courgette risotto", "Pizza", "Gnocchi", "Spaghetti bolognese", "Spaghetti carbonara", "Pesto alla Genovese", "Beef lasagne", "Vegetable lasagne", "Gelato", "Prosciutto di Parma", "Ribollita", "Bagna cauda", "Polenta", "Tortelli and ravioli", "Focaccia", "Garlic bread", "Arancini", "Il tartufo", "Panzerotto fritto", "Fiorentina", "Minestrone", "Frico", "Arrosticini", "Olive ascolante", "Fritto misto piemontes", "Tiramisù"], india: ["Biryani", "Dosa", "Tandoori chicken", "Samosas", "Chaat", "Plain naan", "Garlic naan", "Pilau rice", "Steamed rice", "Chicken madras", "Vegetable madras", "Chicken vindaloo", "Chicken jalfrezi", "Chicken roghan josh", "Lamb roghan josh", "Beef roghan josh", "Butter chicken", "Dosa", "Gulab jamun", "Chicken korma", "Mutter paneer", "Papadum", "Paratha", "Raita", "Saag paneer", "Tandoori chicken", "Chicken tikka masala", "Pakora", "Dal", "Chapati", "Pasanda", "Aloo gobi", "Kofta", "Chicken makhani", "Paneer naan", "Chana Aloo Curry"], mexico: ["Chilaquiles", "Pozole", "Tacos al pastor", "Tostadas", "Chiles en nogada", "Elote", "Enchiladas", "Mole", "Guacamole", "Tamales", "Huevos rancheros", "Machaca", "Discada", "Beef Burrito", "Chicken Burrito", "Pozole de pollo o duajolote", "Menudo", "Cochinita pibil", "Tamale", "Quesadilla", "Frijoles puercos", "Chile en nogada", "Esquites", "Alegria de amaranto", "Pipián", "Aguachile", "Ceviche", "Pescado zarandeado", "Camarones a la diabla", "Birria de chivo", "Tlayuda", "Guacamole con chapulines", "Flautas", "Torta Ahogada", "Carnitas", "Caldo Azteca", "Gorditas de Nata"], japan: ["Sushi", "Udon", "Tofu", "Tempura", "Yakitori", "Sashimi", "Ramen", "Donburi", "Natto", "Oden", "Tamagoyaki", "Soba", "Tonkatsu", "Kashipan", "Sukiyaki", "Miso soup", "Okonomiyaki", "Mentaiko", "Nikujaga", "Unagi no kabayaki", "Shabu Shabu", "Onigiri", "Gyoza", "Takoyaki", "aiseki ryori", "Edamame", "Yakisoba", "Chawanmushi", "Wagashi"], france: ["Foie gras", "Huîtres", "Cassoulet", "Poulet basquaise", "Escargots au beurre persillé", "Mouclade charentaise", "Galettes bretonnes", "Flemish carbonnade", "Quiche lorraine", "Raclette", "Cheese fondue", "Beef fondue", "Gratin dauphinois", "Tartiflette", "Bouillabaisse", "Ratatouille", "Boeuf bourguignon", "Blanquette de veau", "Pot-au-feu", "Coq-au-vin", "Hachis parmentier", "Steak tartare", "Choucroute", "Soufflé au fromage", "Cuisses de grenouilles", "Soupe à l’oignon", "Baguette", "Croissant", "French cheeses", "Fondant au chocolat", "Tarte tatin", "Macarons", "Crème brûlée", "Île flottante", "Profiteroles", "Pain au chocolat"], lebanon: ["Kibbeh", "Kafta", "Kanafeh", "Hummus", "Rice pilaf", "Fattoush", "Manakish", "Tabbouleh", "Sfeeha", "Fattoush", "Labneh", "Muhammara", "Lahm bi ajin", "Kaak", "Chanklich", "Mssabaha", "Shawarma", "Kebbe", "Falafel", "Halewit el jeben", "Namoura", "Maamoul", "Foul mdammas", "Balila", "Kawarma", "Fattouch"], thailand: ["Pad kra pao moo", "Tom kha gai", "Khao Pad", "Chicken pad Thai", "Vegetable pad Thai", "Moo satay", "Tom yum goong", "Khao niew mamuang", "Kai yad sai", "Khao soi", "Pad see ew", "Laab moo", "Gaeng panang", "Gai pad med ma muang", "Som tam", "Poh pia tod", "Gaeng massaman", "Pla kapung nueng manao", "Tod mun pla", "Gaeng ped", "Gaeng garee", "Gaeng keow wan", "Moo ping", "Durian", "Sai ooah", "Hoy tod", "Kuay teow reua", "Mu kratha", "Kao ka moo", "Yam nua"], greece: ["Moussaka", "Papoutsakia", "Pastitsio", "Souvlaki", "Soutzoukakia", "Stifado", "Tomatokeftedes", "Tzatziki", "Kolokithokeftedes", "Giouvetsi", "Choriatiki", "Kleftiko", "Gemista", "Fasolada", "Bougatsa", "Tiropita", "Spanakopita", "Feta Cheese with Honey", "Horta", "Tirokroketes", "Briam", "Saganaki", "Gigantes", "Dolmades", "Fasolatha", "Koulouri", "Loukoumades", "Gyros", "Galaktoboureko", "Baklava"], turkey: ["Şiş kebap", "Döner", "Köfte", "Pide", "Kumpir", "Meze", "Mantı", "Lahmacun", "Menemen", "Şiş kebap", "İskender kebab", "Corba", "Kuzu tandir", "Çiğ Köfte", "Pilav", "Yaprak sarma", "Dolma", "İmam bayıldı", "Borek", "Durum", "Kumpir", "Balik ekmek", "Simit", "Kunefe", "Baklava", "Lokum", "Halva", "Mozzaik pasta", "Güllaç", "Mercimek Köftesi", "Haydari", "Tursu suyu", "Kahvalti", "Kazan dibi", "Hunkar begendi", "Islak burgers", "Salep", "Yogurtlu kebab"], spain: ["Tortilla de patatas", "Fabada asturiana", "Calçots", "Boquerones al vinagre", "Empanada gallega", "Paella", "Gazpacho", "Gachas", "Migas", "Bocadillo de calamares", "Pulpo a feira", "Caldo gallego", "Lentejas con chorizo", "Cocido madrileño", "Cachopo", "Caracoles"], venezuela: ["Pabellón criollo", "Arepa", "Mondongo", "Empanadas", "Quesillo", "Chicha andina", "Tequeños", "Cachapa", "Hallaca", "Perico", "Pasticho", "Mandocas", "Caraotas negras", "Patacones", "Dulce de leche", "Pan de Jamón"], chile: ["Humitas", "Empanadas", "Porotos con riendas", "Completos", "Manjar", "Cordero al palo", "Pastel de choclo", "Mote con huesillos", "Sopaipillas", "Curanto"], argentina: ["Milanesas", "Empanadas", "Pizza fugazeta", "Asado", "Choripan", "Bondiola", "Bife de chorizo"], colombia: ["Bandeja paisa", "Chuleta valluna", "Sancocho trifásico", "Empanada valluna", "Salpicon de frutas", "Pastel de garbanzo", "Ajiaco", "Arepas", "Arroz de lisa", "Sancocho", "Pan de bono", "Cuchuco", "Oblea", "Cazuela de mariscos", "Pan de yuca", "Bollo Limpio", "Almojábana", "Empanadas", "Arroz con Coco", "Sopa de mondongo", "Cazuela de Mariscos", "Arroz con Pollo", "Arepa de Huevo", "Mote de Queso"], ecuador: ["Encebollado", "Ceviche", "Tigrillo", "Bolon de verde", "Llapingacho", "Mote pillo", "Locro de papa", "Churrasco"], peru: ["Ceviche", "Arroz con pollo", "Aji de gallina", "Llunca de gallina"], "el salvador": ["Pupusa", "Sopa de patas", "Rigua", "Flor de izote con huevo", "Gallo en chicha"], romania: ["Sarmale", "Mici", "Pomana porcului", "Ciorbă de fasole cu ciolan", "Ciorbă de burtă", "Ciorbă rădăuțeană", "Plăcintă cu brânză", "Ciorbă de potroace", "Mămăligă cu brânză și smântână", "Tochitură", "Piftie", "Iahnie de fasole", "Slănină afumată", "Cârnați afumați", "Varză a la Cluj", "Gulaș de cartofi cu afumătură", "Cozonac de casă", "Ciorbă ardelenească de porc", "Mucenici moldovenești", "Salată de boeuf", "Dovleac copt", "Papanași cu brânză de vacă și afine", "Drob de miel", "Pârjoale moldovenești", "Zacuscă de vinete", "Zacuscă de fasole", "Turtă dulce", "Clătitele cu gem", "Clătitele cu brânza de vacă", "Balmoș", "Cozonac", "Chiftele"] };
var za = Object.keys(Na)?.length;
function Ka(e2) {
  const a = Na, t2 = e2?.origin;
  if (!za)
    throw "No foods found";
  if (t2 && !a[t2])
    throw "No foods found for selected origin";
  return n(() => {
    if (t2)
      return r(a[t2]);
    const e3 = s({ min: 0, max: za - 1 }), i2 = (o2 = a, Object.keys(o2))[e3];
    var o2;
    return r(a[i2]);
  }, e2);
}
var Oa = ["AFC Bournemouth", "Alavés", "Arsenal", "Aston Villa", "Athletic Bilbao", "Atlético Madrid", "Barcelona", "Barnsley", "Birmingham City", "Blackburn Rovers", "Blackpool", "Bolton Wanderers", "Bradford City", "Brentford", "Brighton and Hove Albion", "Burnley", "Cádiz", "Cardiff City", "Celta Vigo", "Charlton Athletic", "Chelsea", "Coventry City", "Crystal Palace", "Derby County", "Elche", "Espanyol", "Everton", "Fulham", "Getafe", "Granada", "Huddersfield Town", "Hull City", "Ipswich Town", "Leeds United", "Leicester City", "Levante", "Liverpool", "Mallorca", "Manchester City", "Manchester United", "Middlesbrough", "Newcastle United", "Norwich City", "Nottingham Forest", "Oldham Athletic", "Osasuna", "Portsmouth", "Queens Park Rangers", "Rayo Vallecano", "Reading", "Real Betis", "Real Madrid", "Real Sociedad", "Sevilla", "Sheffield United", "Sheffield Wednesday", "Southampton", "Stoke City", "Sunderland", "Swansea City", "Swindon Town", "Tottenham Hotspur", "Valencia", "Villarreal", "Watford", "West Bromwich Albion", "West Ham United", "Wigan Athletic", "Wimbledon", "Wolverhampton Wanderers", "River Plate", "Boca Juniors", "Atlético Nacional", "Independiente", "Llaneros", "Tigre", "Palmeiras", "Atletico Paranaense", "Sydney FC", "Melbourne Victory"];
function Ja(e2) {
  return n(Oa, e2);
}
var Va = ["always", "constantly", "usually", "normally", "frequently", "regularly", "often", "sometimes", "occasionally", "rarely", "infrequently", "seldom", "hardly", "never", "hourly", "daily", "weekly", "monthly", "yearly", "once", "twice"];
function Ua(e2) {
  return n(Va, e2);
}
function ja(e2) {
  const a = { withAccents: e2?.withAccents, gender: e2?.gender };
  return n(() => `${va(a)} ${Sa(a)}`, e2);
}
var _a = 31536e6;
function Ya(e2) {
  const a = e2?.years ?? 1;
  if (a <= 0)
    throw new Error("Years must be positive, use past() instead");
  const t2 = a * _a, i2 = /* @__PURE__ */ new Date(), o2 = new Date(i2.getTime() + t2);
  return n(() => Q({ from: i2, to: o2 }), e2);
}
var Qa = ["Cisgender", "Male to female transgender woman", "Androgyne", "Bigender", "Pangender", "Cis", "Transexual Person", "Transgender Female", "Female to male transsexual man", "Gender neutral", "Intersex woman", "Intersex", "Transexual Female", "Trans*Male", "Cisgender Male", "Transexual Woman", "Trans Female", "Gender Variant", "Male to Female", "Two-spirit", "Trans Man", "Gender Nonconforming", "Non-binary", "Transgender Person", "Cisgender Woman", "Cis Woman", "Cis Female", "Trans*Woman", "Polygender", "M2F", "Neither", "Male to female transsexual woman", "Intersex man", "Asexual", "Transexual", "Cis Male", "T* woman", "Woman", "Cisgender Female", "Other", "T* man", "Androgynous", "Trans Male", "Male to female trans woman", "Transexual Male", "Cis Man", "Female to male transgender man", "Genderqueer", "Neutrois", "Intersex person", "FTM", "Hermaphrodite", "Female to Male"];
var $a = ["Andro", "Bi", "Pan", "F", "M", "Cis", "Cis M", "Cis W", "Cis F", "Demi", "T*", "T F", "GV", "T M", "T*M", "T*W", "Non-bi", "Poly", "M2F", "M2FT", "Ace", "W", "Other", "NC", "Q", "TC", "TGNC", "FTM", "GSM"];
function Za(e2) {
  return n(e2?.code ? $a : Qa, e2);
}
var Xa = ["protocol-navigate", "array-quantify", "transmitter-override", "circuit-compress", "feed-program", "microchip-parse", "feed-quantify", "card-synthesize", "bus-reboot", "application-input", "firewall-generate", "monitor-transmit", "sensor-parse", "port-compress", "interface-reboot", "capacitor-program", "monitor-quantify", "transmitter-input"];
function et(e2) {
  return n(Xa, e2);
}
function at() {
  return k({ min: 0, max: 15 }).toString(16);
}
function tt(e2) {
  return n(at, e2);
}
function it(e2) {
  return () => {
    let a = "";
    for (let t2 = 0; t2 < e2; t2++)
      a += tt();
    return a;
  };
}
var ot = 40;
function nt(e2) {
  return n(it(ot), e2);
}
function rt(e2) {
  return n(() => {
    const e3 = [];
    for (let a = 0; a < k({ min: 2, max: 5 }); a++)
      e3.push(ha());
    return e3.join(" ");
  }, e2);
}
function st(e2) {
  return n(() => `commit ${nt()}\\r\\nAuthor: ${ja()} <${Ca()}>\\r\\nDate: ${(/* @__PURE__ */ new Date()).toString()}\\r\\n\\r\\n${rt()}`, e2);
}
function lt(e2) {
  return n(it(7), e2);
}
function ut(e2) {
  return n(() => `#${i().toString(16).substr(2, 6)}`, e2);
}
var ct = ["Pottok", "Dutch Heavy Draft", "Spanish Barb", "Russian Heavy Draft", "American Saddlebred", "Camarillo White Horse", "Karachai Horse", "Andalusian Horse", "Poitevin Horse", "Colorado Ranger", "Paso Fino", "Swiss Warmblood", "Murgese", "Selle Français", "Riwoche Horse", "French Trotter", "American Indian Horse", "Jeju Horse"];
function dt(e2) {
  return n(ct, e2);
}
function ht(e2) {
  return n(() => {
    const [a, t2, i2, o2] = [s({ min: 0, max: 359, fraction: 0 }), s({ min: 0, max: 100, fraction: 0 }), s({ min: 0, max: 100, fraction: 0 }), Ra({ min: 0.1, max: 1 })];
    return e2?.alpha ? `hsla(${a}, ${t2}%, ${i2}%, ${o2})` : `hsl(${a}, ${t2}%, ${i2}%)`;
  }, e2);
}
var mt = ["GET", "POST", "PUT", "PATCH", "DELETE"];
function pt(e2) {
  return n(mt, e2);
}
function yt(e2) {
  return n(() => `${e2?.countryCode ?? X()}${k({ min: 10, max: 99 }).toString()}${Array(k({ min: 12, max: 30 })).fill("#").join("").replace(/#/g, () => S().toString())}`.toUpperCase(), e2);
}
var gt = ["Anaheim Ducks", "Arizona Coyotes", "Boston Bruins", "Buffalo Sabres", "Calgary Flames", "Carolina Hurricanes", "Chicago Blackhawks", "Colorado Avalanche", "Columbus Blue Jackets", "Dallas Stars", "Detroit Red Wings", "Edmonton Oilers", "Florida Panthers", "Los Angeles Kings", "Minnesota Wild", "Montréal Canadiens", "Nashville Predators", "New Jersey Devils", "New York Islanders", "New York Rangers", "Ottawa Senators", "Philadelphia Flyers", "Pittsburgh Penguins", "San Jose Sharks", "Seattle Kraken", "St. Louis Blues", "Tampa Bay Lightning", "Toronto Maple Leafs", "Vancouver Canucks", "Vegas Golden Knights", "Washington Capitals", "Winnipeg Jets"];
function ft(e2) {
  return n(gt, e2);
}
function bt(e2) {
  const [a, t2, i2] = [e2?.width ?? e2?.height ?? 500, e2?.height ?? e2?.width ?? 500, e2?.grayscale ?? false];
  return n(() => `https://picsum.photos/${a}/${t2}${i2 ? "?grayscale" : ""}`, e2);
}
var wt = ["Slack", "GitHub", "Jira", "AWS Lambda", "Bitbucket", "Bitbucket Server", "GitHub Enterprise", "GitLab", "Grafana", "Jira Server", "Microsoft Teams", "PagerDuty", "Vercel", "Azure DevOps", "WebHooks", "Amixr", "Calixa", "ClickUp", "Komodor", "Linear", "Rookout", "Shortcut", "Spike.sh", "Split", "TaskCall", "Teamwork", "Asana", "OpenReplay", "Bitbucket Pipelines", "Datadog", "FullStory", "GitHub Actions", "Heroku", "InsightFinder", "Netlify", "Octohook", "Learn More", "Pivotal Tracker", "Rocket.Chat", "Trello", "Twilio (SMS)", "OpsGenie", "Phabricator", "Pushover", "Redmine", "SessionStack", "VictorOps", "Amazon SQS", "Segment", "Splunk"];
function vt(e2) {
  return n(wt, e2);
}
var kt = { min: 0, max: 255 };
function St(e2) {
  return n(() => Array.from({ length: 4 }, () => k(kt)).join("."), e2);
}
function Ct(e2) {
  return n(() => Array.from({ length: 8 }, () => Array.from({ length: 4 }, () => tt()).join("")).join(":"), e2);
}
var At = ["Brand", "Tactics", "Markets", "Usability", "Operations", "Integration", "Identity", "Marketing", "Creative", "Response", "Branding", "Quality", "Program", "Accounts", "Accountability", "Interactions", "Security", "Applications", "Configuration", "Factors", "Paradigm", "Division", "Group", "Data", "Directives", "Optimization", "Web", "Functionality", "Research", "Intranet", "Solutions", "Mobility", "Communications", "Metrics", "Assurance"];
function Mt(e2) {
  return n(At, e2);
}
var Tt = ["Senior", "Corporate", "Future", "International", "Global", "Central", "Product", "Internal", "National", "Direct", "Customer", "Human", "Lead", "District", "Chief", "Dynamic", "Principal", "Forward", "Legacy", "Regional", "Investor"];
function Bt(e2) {
  return n(Tt, e2);
}
var It = ["Internal Quality Coordinator", "Legacy Marketing Planner", "Investor Configuration Specialist", "Human Directives Engineer", "District Quality Technician", "Central Mobility Liaison", "International Interactions Orchestrator", "Central Implementation Producer", "Forward Configuration Facilitator", "Internal Solutions Coordinator", "Global Web Agent", "International Brand Associate", "Regional Applications Strategist", "Direct Brand Analyst", "Investor Mobility Consultant", "Principal Division Supervisor", "Chief Interactions Administrator", "District Web Facilitator", "Investor Metrics Consultant", "Corporate Applications Director", "Corporate Group Planner", "Global Functionality Manager", "Principal Web Engineer", "National Directives Executive", "Dynamic Factors Officer", "Principal Identity Supervisor", "Dynamic Solutions Administrator", "Corporate Interactions Analyst", "Senior Configuration Consultant", "Human Web Consultant", "Customer Metrics Technician", "Senior Solutions Producer", "Central Operations Technician", "Product Security Producer", "Forward Security Executive", "Dynamic Assurance Architect", "Internal Integration Representative", "Lead Web Developer", "Human Directives Assistant", "Internal Operations Representative", "Chief Communications Associate", "Principal Branding Strategist", "International Paradigm Specialist", "Regional Security Administrator", "Forward Operations Architect", "Product Mobility Orchestrator", "Lead Functionality Orchestrator", "Lead Solutions Consultant", "Human Markets Strategist", "International Infrastructure Engineer", "Dynamic Response Officer", "Dynamic Quality Engineer", "National Creative Strategist", "Principal Security Representative", "Internal Usability Executive", "Product Usability Coordinator", "Global Optimization Associate", "Global Configuration Executive", "Global Research Engineer", "Regional Accounts Associate", "Central Identity Agent", "Principal Program Officer", "Senior Group Developer", "Forward Research Coordinator", "Legacy Identity Developer", "Central Interactions Developer", "Direct Research Technician", "Chief Web Planner", "Investor Program Architect", "National Intranet Architect", "Principal Operations Administrator", "Legacy Security Associate", "Global Communications Architect", "Forward Configuration Analyst", "Customer Program Representative", "Dynamic Communications Director", "Dynamic Division Architect", "Customer Security Manager", "Dynamic Branding Analyst", "Internal Configuration Agent", "Principal Program Liaison", "Regional Research Administrator", "Dynamic Functionality Coordinator", "Investor Configuration Producer", "Direct Web Engineer", "Central Implementation Orchestrator", "Investor Tactics Strategist", "National Creative Agent", "Central Intranet Specialist", "Future Creative Strategist", "Product Intranet Liaison", "Dynamic Markets Consultant", "Global Infrastructure Administrator", "Lead Interactions Supervisor", "Future Usability Designer", "Principal Research Producer", "International Quality Facilitator", "Legacy Data Director", "Dynamic Infrastructure Representative", "Direct Paradigm Analyst"];
function Pt(e2) {
  return n(It, e2);
}
var xt = ["Director", "Representative", "Officer", "Coordinator", "Engineer", "Designer", "Developer", "Specialist", "Analyst", "Orchestrator", "Technician", "Executive", "Assistant", "Producer", "Liaison", "Consultant", "Architect", "Associate", "Manager", "Agent", "Facilitator", "Planner", "Administrator", "Supervisor"];
function Dt(e2) {
  return n(xt, e2);
}
var Gt = ["Afrikaans", "Amharic", "Arabic", "Azerbaijani", "Byelorussian", "Bulgarian", "Bengali,Bangla", "Bosnian", "Catalan", "Cebuano", "Corsican", "Czech", "Welsh", "Danish", "German", "Greek", "English", "Esperanto", "Spanish", "Estonian", "Basque", "Persian", "Finnish", "French", "Frisian", "Irish", "Gaelic (Scots Gaelic)", "Galician", "Gujarati", "Hausa", "Hindi", "Hmong", "Croatian", "Haitian Creole", "Hungarian", "Armenian", "Indonesian", "Igbo", "Icelandic", "Italian", "Hebrew", "Japanese", "Javanese", "Georgian", "Kazakh", "Cambodian", "Kannada", "Korean", "Kurdish", "Kirghiz", "Latin", "Luxembourgish", "Laothian", "Lithuanian", "Latvian,Lettish", "Malagasy", "Maori", "Macedonian", "Malayalam", "Mongolian", "Marathi", "Malay", "Maltese", "Burmese", "Nepali", "Dutch", "Norwegian", "Nyanja", "Punjabi", "Polish", "Pashto,Pushto", "Portuguese", "Romanian", "Russian", "Sindhi", "Singhalese", "Slovak", "Slovenian", "Samoan", "Shona", "Somali", "Albanian", "Serbian", "Sesotho", "Sundanese", "Swedish", "Swahili", "Tamil", "Tegulu", "Tajik", "Thai", "Turkish", "Ukrainian", "Urdu", "Uzbek", "Vietnamese", "Xhosa", "Yiddish", "Yoruba", "Chinese", "Zulu"];
var Ft = ["af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "ce", "co", "cs", "cy", "da", "de", "el", "en", "eo", "es", "et", "eu", "fa", "fi", "fr", "fy", "ga", "gd", "gl", "gu", "ha", "hi", "hm", "hr", "ht", "hu", "hy", "id", "ig", "is", "it", "iw", "ja", "jv", "ka", "kk", "km", "kn", "ko", "ku", "ky", "la", "lb", "lo", "lt", "lv", "mg", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "ne", "nl", "no", "ny", "pa", "pl", "ps", "pt", "ro", "ru", "sd", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "tr", "uk", "ur", "uz", "vi", "xh", "yi", "yo", "zh", "zu"];
function qt(e2) {
  return n(e2?.code ? Ft : Gt, e2);
}
function Lt(e2) {
  return n(() => s({ min: -90, max: 90, fraction: 3 }), e2);
}
var Rt = 50;
function Et(e2) {
  const a = s({ min: 1, max: 10, fraction: 0 });
  return 1 === a || e2 === Rt ? "." : 2 === a ? "," : "";
}
function Ht(e2) {
  return n(() => {
    let e3 = ha({ capitalize: true }), a = 1;
    for (; a < Rt; ) {
      const t2 = ha();
      let i2 = "";
      if (a++, a > 3 && (i2 = Et(a)), e3 += ` ${t2}${i2}`, "." === i2)
        break;
    }
    return e3;
  }, e2);
}
function Wt(e2) {
  const a = e2?.lineCount ?? 5;
  if (a < 1 || isNaN(a))
    throw "Line count must be greater than 0";
  return n(() => {
    let e3 = `${Ht()}
`;
    for (let t2 = 0; t2 < a - 1; t2++)
      e3 += `${Ht()}
`;
    return e3;
  }, e2);
}
var Nt = ["Commodi est rerum dolorum quae voluptatem aliquam.", "Minima qui ut nulla eius.\\nA incidunt ipsum tempore porro tempore.\\nFugit quas voluptas ducimus aut.\\nTempore nostrum velit expedita voluptate est.\\nNam iste explicabo tempore impedit voluptas.", "Dolorem sed neque sequi ad nulla.\\nEum tempora ut sit et ducimus.\\nVel a expedita dignissimos.\\nFacilis iste ut.\\nAd saepe doloremque possimus mollitia atque explicabo.", "Omnis quidem vero eius sed laudantium a ex a saepe.\\nModi qui laudantium in libero odit et impedit.", "Doloribus temporibus dolorum placeat.\\nFugit nulla quaerat.\\nEveniet ratione odit sed non rerum.\\nNemo tempore eveniet veritatis alias repellat et.\\nVoluptas nisi quis commodi id.", "Sunt hic autem eum sint quia vitae.", "Laborum est maxime enim accusantium magnam.\\nRerum dolorum minus laudantium delectus eligendi necessitatibus quia.\\nDeleniti consequatur explicabo aut nobis est vero tempore.\\nExcepturi earum quo quod voluptatem quo iure vel sapiente occaecati.\\nConsectetur consequatur corporis doloribus omnis harum voluptas esse amet.", "Sed dolores nostrum quis.", "Autem sed aspernatur aut sint ipsam et facere rerum voluptas.\\nPerferendis eligendi molestias laudantium eveniet eos.\\nId veniam asperiores quis voluptates aut deserunt.\\nTempora et eius dignissimos nulla iusto et omnis pariatur.\\nSit mollitia eum blanditiis suscipit.", "Temporibus aut adipisci magnam aliquam eveniet nihil laudantium reprehenderit sit.\\nAspernatur cumque labore voluptates mollitia deleniti et.", "Ipsam voluptate fugiat iusto illo dignissimos rerum sint placeat.\\nLabore sit omnis.", "Deserunt ab porro similique est accusamus id enim aut suscipit.\\nSoluta reprehenderit error nesciunt odit veniam sed.\\nDolore optio qui aut ab.\\nAut minima provident eius repudiandae a quibusdam in nisi quam.", "Mollitia nostrum exercitationem sunt rem.\\nRem et voluptas consequatur mollitia nostrum.\\nSunt nesciunt et pariatur quam provident impedit.", "Ipsum eos ipsam.\\nAperiam quia quis sit fugiat saepe voluptas est.\\nDolores et veniam ut.\\nQuibusdam voluptatum quis.\\nEt omnis ut corporis.", "Quia consequatur voluptatibus et.\\nVoluptatibus aspernatur et.\\nDicta architecto qui dignissimos.\\nVeritatis facilis voluptatem inventore aliquid cum.\\nNumquam odio quis porro sunt adipisci culpa.", "Totam ab necessitatibus quidem non.", "Quia quo iste et aperiam voluptas consectetur a omnis et.\\nDolores et earum consequuntur sunt et.\\nEa nulla ab voluptatem dicta vel.", "Qui corrupti at eius cumque adipisci ut sunt voluptates ab.", "Blanditiis non quos aut dolore nulla unde.\\nIncidunt repudiandae amet eius porro.\\nTempora unde sapiente repellat voluptatem omnis et ut omnis in.\\nEt pariatur odit qui minima perspiciatis non dolores.", "Sed odit quidem qui sed eum id eligendi laboriosam.", "Nisi vitae nostrum perspiciatis impedit laborum repellat ullam et ut.", "Quas ea voluptatem iste iure.\\nEt soluta et doloremque vero quis occaecati et fuga.\\nIncidunt recusandae dignissimos iusto quisquam sed unde at ea incidunt.\\nId voluptate incidunt qui totam autem voluptas maxime atque quaerat.\\nCorporis iste ut molestiae.", "Qui soluta veritatis autem repellat et inventore occaecati.", "Totam voluptas consequatur officiis.\\nPlaceat sit nobis ut est quae dolore consequuntur vel.\\nRepudiandae ut molestias rerum occaecati quod.\\nRerum optio minus aliquid.\\nIllum et voluptas iusto molestiae nulla praesentium deserunt est voluptas.", "Ut atque harum inventore natus facere sed molestiae.\\nQuia aliquid ut.\\nAnimi sunt rem et sit ullam dolorem ab consequatur modi.", "Ut in omnis sapiente laboriosam autem laborum.\\nRepellendus et beatae qui qui numquam saepe.\\nNon vitae molestias quos illum.\\nSed fugiat qui ullam molestias ad ullam dolore.\\nAutem ex minus distinctio dicta sapiente beatae veritatis at.", "Nemo repudiandae molestiae.\\nNobis sed ducimus aperiam.\\nBeatae cupiditate praesentium in omnis.", "Voluptatem sed debitis.\\nArchitecto sint et deleniti et quod possimus cupiditate.\\nTempore aut eum ipsum recusandae aliquid.", "Qui eligendi molestiae molestiae sit rem quis.\\nDucimus voluptates ut ducimus possimus quis.\\nCupiditate velit cupiditate harum impedit minima veniam ipsam amet atque.\\nEt architecto molestiae omnis eos aspernatur voluptatem occaecati non.\\nMolestiae inventore aut aut nesciunt totam eum a expedita illo.", "Consequuntur dolorem enim eos sit.\\nMollitia impedit dolor optio et dolorem.\\nVitae nulla eos excepturi culpa.\\nMagni iure optio quaerat.\\nAb sed sit autem et ut eum.", "Et fuga repellendus magnam dignissimos eius aspernatur rerum.", "Debitis facilis dolorum maiores aut et.\\nEa voluptas magnam deserunt at ut sunt voluptatem.\\nEt voluptatem voluptatem.\\nUt est fugiat magnam.", "Temporibus quod quidem placeat porro.\\nUnde ipsam vel explicabo.", "Voluptatum tempora voluptas est odio iure odio dolorem.\\nVoluptatum est deleniti explicabo explicabo harum provident quis molestiae.", "Laborum excepturi numquam sequi reiciendis voluptate repellat sint.\\nQui inventore ipsam voluptatem sit quos.\\nDolorem aut quod suscipit fugiat culpa.\\nOdio nostrum praesentium accusantium dolor quo.", "Voluptatem velit ut deserunt.\\nQuibusdam eius repellat.", "Illum voluptates ut vel et.\\nUt debitis excepturi suscipit perferendis officia numquam possimus.\\nFacere sit doloremque repudiandae corrupti veniam qui.", "Autem reiciendis provident iure possimus.\\nOccaecati soluta quibusdam libero tenetur minus vel sit illo.\\nCulpa optio dolorem eos similique voluptatem voluptatibus error accusantium.", "Ipsa cumque ad repellat qui libero quia impedit fugiat.\\nExcepturi ut vitae recusandae eos quisquam et voluptatem.\\nNeque nostrum distinctio provident eius tempore odio aliquid.\\nSaepe ut suscipit architecto.", "Non natus nihil.", "Ad voluptate vel.\\nAut aut dolor.", "Est est sed itaque necessitatibus vitae officiis.\\nIusto dolores sint eveniet quasi dolore quo laborum esse laboriosam.\\nModi similique aut voluptates animi aut dicta dolorum.\\nSint explicabo autem quidem et.\\nNeque aspernatur assumenda fugit provident.", "Voluptatibus harum ullam odio sed animi corporis.", "Laborum itaque quos provident.\\nRerum cupiditate praesentium amet voluptatem dolor impedit modi dicta.\\nVoluptates assumenda optio est.\\nNon aperiam nam consequuntur vel a commodi dicta incidunt.", "Et perspiciatis illo.\\nLaboriosam aspernatur omnis expedita doloribus.\\nEum aliquam provident voluptas similique et omnis.", "Ipsa laudantium deserunt.", "Nesciunt numquam velit nihil qui quia eius.", "Voluptate et quasi optio eos et eveniet culpa et nobis.\\nSint aut sint sequi possimus reiciendis nisi.\\nRerum et omnis et sit doloribus corporis voluptas error.\\nIusto molestiae tenetur necessitatibus dolorem omnis.", "Quia harum nulla et quos sint voluptates exercitationem corrupti.", "Similique et quos maiores commodi exercitationem laborum animi qui.", "Ab quis aut earum.\\nVoluptatem sint accusantium sed cupiditate optio.\\nConsequatur in dolores aut enim.\\nNon sunt atque maxime dolores.\\nNam impedit sit.", "Sunt excepturi ut dolore fuga.\\nAutem eum maiores aut nihil magnam corporis consectetur sit.", "Cum vitae aliquam neque consequatur quia id dicta ipsam.\\nExercitationem ab eum exercitationem non alias numquam qui.\\nItaque rerum ut nobis est nam vitae exercitationem minima fugiat.\\nEst sit non tempora soluta consequatur eveniet.\\nCorporis nisi dolorem architecto voluptatem.", "Qui et dolorum.\\nEveniet architecto qui accusamus et modi harum facilis a eum.\\nEt vel cumque voluptatem earum minima perferendis.", "Consequatur odit voluptatem qui.\\nQui quis sequi vel corrupti asperiores soluta rerum.\\nIusto at id quod reiciendis.", "Dolorum eius dignissimos et magnam voluptate aut voluptatem natus.\\nAut sint est eum molestiae consequatur officia omnis.\\nQuae et quam odit voluptatum itaque ducimus magni dolores ab.\\nDolorum sed iure voluptatem et reiciendis.", "Id est non ad temporibus nobis.\\nQuod soluta quae voluptatem quisquam est.", "Exercitationem suscipit enim et aliquam dolor.", "Deleniti explicabo assumenda ipsum cumque voluptatem blanditiis voluptatum omnis provident.\\nQuis placeat nisi fugit aperiam quaerat mollitia.\\nOccaecati repellendus voluptate similique.\\nLaboriosam qui qui voluptas itaque ipsa.", "Voluptas aut occaecati cum et quia quam.\\nBeatae libero doloribus nesciunt iusto.\\nDolores vitae neque quisquam qui ipsa ut aperiam.", "Eveniet sit ipsa officiis laborum.\\nIn vel est omnis sed impedit quod magni.\\nDignissimos quis illum qui atque aut ut quasi sequi.", "Voluptatem cumque molestias soluta consequatur aut voluptatibus beatae vel commodi.\\nNulla voluptatem aut.", "Pariatur quo neque est perspiciatis non illo rerum expedita minima.\\nEt commodi voluptas eos ex.\\nUnde velit delectus deleniti deleniti non in sit.\\nAliquid voluptatem magni.", "Aut ipsa et qui vel similique sed hic a.\\nVoluptates dolorem culpa nihil aut ipsam voluptatem.", "Animi enim quo deserunt.\\nAmet facilis at laboriosam.\\nRerum assumenda harum et sapiente suscipit ipsa fugiat.\\nSunt ut aut rem expedita consequatur optio.\\nRecusandae tenetur rerum quos culpa.", "Maiores assumenda porro est ea necessitatibus qui qui dolorum.\\nVelit suscipit ut ipsam odit aut earum.", "Placeat sequi quaerat sapiente aspernatur autem sunt molestiae voluptatem.\\nAccusamus unde libero accusamus omnis totam et temporibus.", "Nemo tempore dolor maiores blanditiis quia qui qui voluptatem non.\\nNisi dolores animi laboriosam aliquam qui adipisci voluptates atque dignissimos.\\nLibero sit quibusdam corporis aut inventore natus libero.\\nPraesentium omnis dolorum temporibus repellendus qui.\\nNon nostrum doloribus occaecati dolores sit ut.", "Libero sed ut architecto.\\nEx itaque et modi aut voluptatem alias quae.\\nModi dolor cupiditate sit.\\nDelectus consectetur nobis aliquid deserunt sint ut et voluptas.\\nCorrupti in labore laborum quod.", "Est aut quis soluta accusantium debitis vel.\\nQuisquam aliquid ex corporis velit.", "Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae.", "Ducimus dolores recusandae.\\nEa aut aperiam et aut eos inventore.\\nQuia cum ducimus autem iste.\\nQuos consequuntur est delectus temporibus autem.", "Sapiente vitae culpa ut voluptatem incidunt excepturi voluptates exercitationem.\\nSed doloribus alias consectetur omnis occaecati ad placeat labore.\\nVoluptate consequatur expedita nemo recusandae sint assumenda.\\nQui vel totam quia fugit saepe suscipit autem quasi qui.\\nEt eum vel ut delectus ut nesciunt animi.", "Eos pariatur eos fugit aut aperiam labore beatae.\\nVel non ea id dignissimos voluptate quis error assumenda consectetur.\\nRerum quas libero totam error facere sunt facilis quo.\\nEveniet debitis et aliquid ratione.", "Incidunt doloremque enim autem quam et magnam et expedita fuga.\\nPlaceat quia dolor ut.\\nNon dolor amet temporibus quas non hic sed.\\nQui tempore enim mollitia omnis sed ut eos rerum et.\\nQuidem voluptas est vel.", "Officia consectetur quibusdam velit debitis porro quia cumque.\\nSuscipit esse voluptatem cum sit totam consequatur molestiae est.\\nMollitia pariatur distinctio fugit.", "Ipsa labore numquam aut quidem quia.\\nMinus ut et recusandae sed dolorem eveniet.\\nEst vero sit et omnis et explicabo exercitationem qui quasi.\\nQui maxime iusto alias sint nihil quas.\\nModi quaerat voluptatem reiciendis reiciendis vero.", "Sapiente maxime sequi.", "Ab rerum eos ipsa accusantium nihil voluptatem.\\nEum minus alias.\\nIure commodi at harum.\\nNostrum non occaecati omnis quisquam.", "Facere consequatur ullam.\\nSint illum iste ab et saepe sit ut quis voluptatibus.\\nQuo esse dolorum a quasi nihil.\\nError quo eveniet.\\nQuia aut rem quia in iste fugit ad.", "Sunt dolor maxime nam assumenda non beatae magni molestias quia.", "Facere beatae delectus ut.\\nPossimus voluptas perspiciatis voluptatem nihil sint praesentium.\\nSint est nihil voluptates nesciunt voluptatibus temporibus blanditiis.\\nOfficiis voluptatem earum sed.", "In ipsam mollitia placeat quia adipisci rerum labore repellat.", "Et sed dicta eveniet accusamus consequatur.\\nUllam voluptas consequatur aut eos ducimus.\\nId officia est ut dicta provident beatae ipsa.", "Consequatur exercitationem asperiores quidem fuga rerum voluptas pariatur.\\nRepellendus sit itaque nam.\\nDeleniti consectetur vel aliquam vitae est velit.\\nId blanditiis ullam sed consequatur omnis.", "Dicta quia molestias natus est.\\nSit animi inventore a ut ut suscipit.\\nEos et et commodi eligendi nihil.\\nEa reprehenderit consectetur eum.", "Iusto laborum aperiam neque delectus consequuntur provident est maiores explicabo.", "Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et.", "Quos pariatur tenetur.\\nQuasi omnis eveniet eos maiores esse magni possimus blanditiis.\\nQui incidunt sit quos consequatur aut qui et aperiam delectus.\\nPraesentium quas culpa.\\nEaque occaecati cumque incidunt et.", "Quo perferendis nesciunt.\\nDolore dolorem porro omnis voluptatibus consequuntur et expedita suscipit et.\\nTempora facere ipsa.\\nDolore accusamus soluta officiis eligendi.\\nEum quaerat neque eum beatae odio.", "Ut autem labore nisi iusto.\\nRepellendus voluptate eaque eligendi nam facere tempora soluta.\\nAnimi sed vero aut dignissimos.", "Officia vero fugiat sit praesentium fugiat id cumque.\\nEt iste amet dolores molestiae quo dignissimos recusandae.\\nAliquam explicabo facilis asperiores ea optio.\\nExplicabo ut quia harum corrupti omnis.\\nOmnis sit mollitia qui dolorem ipsam sed aut.", "Non enim expedita maiores incidunt voluptatem rem.\\nEt nam vel nihil non non.\\nVoluptates accusantium aut nisi et error doloribus molestiae voluptas soluta.", "Quis nesciunt ut est eos.\\nQui reiciendis doloribus.\\nEst quidem ullam reprehenderit.\\nEst omnis eligendi quis quis quo eum officiis asperiores quis.", "Reprehenderit quae quas quos sapiente ullam ut.\\nVoluptates non ut.", "Molestias non debitis quibusdam quis quod.\\nSaepe ab et hic unde et sed.\\nMagni voluptatem est.\\nEt similique quo porro et.", "Doloribus consequatur et labore suscipit deserunt tempore ad quasi sed.\\nQuam cupiditate modi dolor et eos et culpa qui.\\nDelectus molestias ea id.\\nIllum ea unde sapiente non non non.\\nDolorem ut sed magni.", "Rerum minus et quia et dolorem officiis sunt id.\\nPariatur dolorum sint blanditiis ex vero optio.\\nQuam numquam omnis porro voluptatem.", "Dolores accusamus ducimus suscipit neque fugit quo aliquam.\\nOdit eum eum sint accusamus.\\nQuod ipsum sed placeat.\\nEt culpa voluptas et quod atque a.\\nVoluptatibus rerum nihil quia cupiditate nihil facere beatae dolor.", "Fugit harum mollitia.\\nMagni eos asperiores assumenda ad."];
function zt(e2) {
  return n(Nt, e2);
}
var Kt = ["Cape lion", "Transvaal lion", "Masai Lion", "Barbary Lion", "West African Lion", "Northeast Congo Lion", "Asiatic Lion"];
function Ot(e2) {
  return n(Kt, e2);
}
var Jt = ["cz", "ge", "ne", "it", "de_CH", "en_AU_ocker", "ja", "ar", "en_CA", "pt_BR", "de", "es", "vi", "hr", "en_ZA", "fr", "id_ID", "nb_NO", "zh_TW", "ro", "pl", "en_GB", "en_AU", "fr_CA", "hy", "ko", "en_BORK", "es_MX", "en_IE", "az", "nl_BE", "en_US", "sk", "fr_CH", "en_IND", "sv", "fi", "en", "zh_CN", "he", "pt_PT", "de_AT"];
function Vt(e2) {
  return n(Jt, e2);
}
function Ut(e2) {
  return n(() => s({ min: -180, max: 180, fraction: 3 }), e2);
}
function jt(e2) {
  return n(() => Array.from({ length: 6 }, () => tt() + tt()).join("-"), e2);
}
function _t(e2) {
  return n(() => {
    const [a, t2, i2] = [e2?.mask ?? "@##@#", e2?.char ?? "@", e2?.digit ?? "#"];
    return a.split("").map((e3) => e3 === t2 ? w() : e3 === i2 ? s({ min: 0, max: 9, fraction: 0 }) : e3).join("");
  }, e2);
}
var Yt = ["application/vnd.lotus-approach", "application/vnd.wv.csp+wbxml", "application/font-tdpfr", "application/vnd.nokia.iptv.config+xml", "application/vnd.oma.dcdc", "application/vnd.dece.data", "audio/x-flac", "application/vnd.uplanet.channel-wbxml", "application/vnd.fsc.weblaunch", "video/mpv", "application/vnd.framemaker", "application/vnd.gov.sk.e-form+xml", "model/vnd.opengex", "application/metalink+xml", "application/scvp-vp-response", "application/vnd.oipf.mippvcontrolmessage+xml", "multipart/form-data", "application/vnd.umajin", "application/x-bzip", "application/vnd.anser-web-certificate-issue-initiation", "application/ocsp-request", "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml", "video/ogg", "audio/evrcwb0", "application/vnd.font-fontforge-sfd", "application/vnd.openxmlformats-officedocument.presentationml-template", "video/parityfec", "application/vnd.openblox.game+xml", "text/jade", "audio/aptx", "application/vnd.japannet-registration", "application/vnd.pvi.ptid1", "application/vnd.webturbo", "application/vnd.accpac.simply.imp", "application/x-msschedule", "image/vnd.airzip.accelerator.azv", "application/vnd.kenameaapp", "application/vnd.geoplan", "application/vnd.tmd.mediaflex.api+xml", "application/mpeg4-iod", "application/vnd.syncml.dmddf+xml", "application/vnd.cluetrust.cartomobile-config", "application/vnd.radisys.msml-audit-stream+xml", "application/vnd.sus-calendar", "application/samlassertion+xml", "application/vnd.ms-word.document.macroenabled.12", "application/x-shockwave-flash", "application/xcap-error+xml", "video/h264-svc", "multipart/header-set", "image/vnd.adobe.photoshop", "application/pkix-pkipath", "application/mac-compactpro", "text/vnd.fly", "application/vnd.novadigm.edm", "application/vnd.dtg.local.flash", "application/vnd.ecowin.series", "application/vnd.spotfire.dxp", "audio/x-m4a", "text/rtp-enc-aescm128", "audio/pcmu", "multipart/appledouble", "audio/x-wav", "application/vnd.ibm.electronic-media", "text/coffeescript", "application/metalink4+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "audio/1d-interleaved-parityfec", "application/vnd.powerbuilder75", "application/sql", "text/markdown", "text/vnd.dmclientscript", "application/pidf+xml", "application/mbms-msk+xml", "audio/rtp-enc-aescm128", "application/x-font-dos", "application/x-pkcs7-certificates", "application/x-msaccess", "text/x-sass", "application/vnd.dart", "application/vnd.palm", "application/vnd.intergeo", "application/vnd.accpac.simply.aso", "model/vnd.moml+xml", "application/vnd.uplanet.alert-wbxml", "audio/g726-24", "image/vnd.microsoft.icon", "application/vnd.openxmlformats-officedocument.presentationml.comments+xml", "audio/ilbc", "audio/vnd.dts.hd", "audio/l20", "audio/vnd.nuera.ecelp4800", "video/vnd.iptvforum.1dparityfec-2005", "application/vnd.ms-asf", "application/vnd.avistar+xml", "audio/vnd.dolby.pulse.1", "application/vnd.dm.delegation+xml"];
function Qt(e2) {
  return n(Yt, e2);
}
var $t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function Zt(e2) {
  const a = $t, t2 = e2?.abbreviation;
  return n(() => {
    const e3 = r(a);
    return t2 ? e3.slice(0, 3) : e3;
  }, e2);
}
var Xt = ["Aprilia", "Benelli", "BMW Motorrad", "Bultaco", "Cagiva", "Daelim", "Derbi", "Ducati", "Gas Gas", "Gilera", "Harley-Davidson", "Honda", "Husqvarna", "Hyosung", "Indian Motorcycle", "Kawasaki", "Keeway", "KTM", "Moto Guzzi", "MV Agusta", "Piaggio", "Rieju", "Royal Enfield", "Suzuki", "SYM", "Triumph", "Vespa", "Yamaha", "Zero Motorcycles"];
function ei(e2) {
  return n(Xt, e2);
}
function ai(e2) {
  return n(Xt, e2);
}
var ti = ["12 Angry Men", "12 Years a Slave", "1917", "2001: A Space Odyssey", "A Beautiful Mind", "A Clockwork Orange", "Alien", "Aliens", "All About Eve", "Amadeus", "American Beauty", "American History X", "Amélie", "Apocalypse Now", "Back to the Future", "Before Sunrise", "Before Sunset", "Ben-Hur", "Bicycle Thieves", "Blade Runner", "Braveheart", "Casablanca", "Casino", "Catch Me If You Can", "Children of Heaven", "Chinatown", "Cinema Paradiso", "Citizen Kane", "City Lights", "City of God", "Cool Hand Luke", "Das Boot", "Dead Poets Society", "Die Hard", "Django Unchained", "Double Indemnity", "Downfall", "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", "Eternal Sunshine of the Spotless Mind", "Everything Everywhere All at Once", "Fargo", "Fight Club", "For a Few Dollars More", "Forrest Gump", "Full Metal Jacket", "Gandhi", "Gladiator", "Gone Girl", "Good Will Hunting", "Goodfellas", "Gran Torino", "Grave of the Fireflies", "Green Book", "Groundhog Day", "Hacksaw Ridge", "Heat", "Hotel Rwanda", "In the Name of the Father", "Inception", "Indiana Jones and the Last Crusade", "Into the Wild", "It Happened One Night", "It's a Wonderful Life", "Jaws", "Jurassic Park", "Kill Bill: Vol. 1", "L.A. Confidential", "Lawrence of Arabia", "Le Mans '66", "Life Is Beautiful", "Life of Brian", "Lock, Stock and Two Smoking Barrels", "Léon: The Professional", "M", "Mad Max: Fury Road", "Memento", "Metropolis", "Million Dollar Baby", "Modern Times", "Monty Python and the Holy Grail", "No Country for Old Men", "North by Northwest", "Oldboy", "On the Waterfront", "Once Upon a Time in America", "Once Upon a Time in the West", "One Flew Over the Cuckoo's Nest", "Paths of Glory", "Platoon", "Princess Mononoke", "Prisoners", "Psycho", "Pulp Fiction", "Raging Bull", "Raiders of the Lost Ark", "Rashomon", "Rear Window", "Requiem for a Dream", "Reservoir Dogs", "Rocky", "Room", "Rush", "Saving Private Ryan", "Scarface", "Schindler's List", "Se7en", "Seven Samurai", "Shutter Island", "Singin' in the Rain", "Snatch", "Some Like It Hot", "Spirited Away", "Spotlight", "Stand by Me", "Star Wars", "Star Wars: Episode V - The Empire Strikes Back", "Star Wars: Episode VI - Return of the Jedi", "Sunset Blvd.", "Taxi Driver", "Terminator 2: Judgment Day", "The Apartment", "The Battle of Algiers", "The Best Years of Our Lives", "The Big Lebowski", "The Bridge on the River Kwai", "The Dark Knight", "The Dark Knight Rises", "The Deer Hunter", "The Departed", "The Elephant Man", "The Exorcist", "The Father", "The General", "The Godfather", "The Godfather: Part II", "The Gold Rush", "The Good, the Bad and the Ugly", "The Grand Budapest Hotel", "The Grapes of Wrath", "The Great Dictator", "The Great Escape", "The Green Mile", "The Help", "The Intouchables", "The Iron Giant", "The Lion King", "The Lives of Others", "The Lord of the Rings: The Fellowship of the Ring", "The Lord of the Rings: The Return of the King", "The Lord of the Rings: The Two Towers", "The Matrix", "The Pianist", "The Prestige", "The Secret in Their Eyes", "The Seventh Seal", "The Shawshank Redemption", "The Shining", "The Silence of the Lambs", "The Sixth Sense", "The Sound of Music", "The Sting", "The Terminator", "The Third Man", "The Treasure of the Sierra Madre", "The Truman Show", "The Usual Suspects", "The Wizard of Oz", "The Wolf of Wall Street", "There Will Be Blood", "Three Billboards Outside Ebbing, Missouri", "To Kill a Mockingbird", "Toy Story 3", "Trainspotting", "Unforgiven", "Up", "Vertigo", "WALL·E", "Warrior", "Wild Tales", "Witness for the Prosecution", "Yojimbo"];
function ii(e2) {
  return n(ti, e2);
}
var oi = ["Darth Vader", "Edna Mode", "Randle McMurphy", "Optimus Prime", "Norman Bates", "The Minions", "Maximus", "Legolas", "Wednesday Addams", "Inspector Clouseau", "Inigo Montoya", "Hal", "Groot", "Gromit", "Ethan Hunt", "Red", "Walker", "Corporal Hicks", "Bane", "Woody", "Withnail", "V", "Roy Batty", "Martin Blank", "Samwise Gamgee", "Private William Hudson", "Lisbeth Salander", "Frank Drebin", "Donnie Darko", "Captain Kirk", "Star-Lord", "Tony Montana", "Marge Gunderson", "Neo", "Harry Potter", "Gollum / Sméagol", "Hans Landa", "George Bailey", "Wolverine", "E.T.", "Bilbo Baggins", "Dr. King Schultz", "Ace Ventura", "Sarah Connor", "Katniss Everdeen", "Jack Burton", "Axel Foley", "Amélie Poulain", "Vito Corleone", "Shaun Riley", "Obi-Wan Kenobi", "Luke Skywalker", "Harry Callahan", "Lester Burnham", "Rick Deckard", "Captain America", "Tommy DeVito", "Anton Chigurh", "Amy Dunne", "Lou Bloom", "Keyser Söze", "Ferris Bueller", "Driver", "Yoda", "Walter Sobchak", "Rocky Balboa", "Atticus Finch", "Captain Mal Reynolds", "The Man With No Name", "Jules Winnfield", "Peter Venkman", "Gandalf", "Snake Plissken", "The Terminator (T-800)", "Forrest Gump", "Patrick Bateman", "Ash", "Daniel Plainview", "The Bride", "Travis Bickle", "Hannibal Lecter", "Doc Brown", "Loki", "Rick Blaine", "M. Gustave", "Ron Burgundy", "Aragorn", "Captain Jack Sparrow", "Iron Man", "Marty McFly", "Michael Corleone", "The Dude", "Tyler Durden", "John McClane", "The Joker", "Ellen Ripley", "Batman", "Han Solo", "James Bond", "Indiana Jones"];
function ni(e2) {
  return n(oi, e2);
}
var ri = ["Classical", "Reggae", "Blues", "Country", "Latin", "Funk", "Rap", "Folk", "Electronic", "World", "Hip Hop", "Pop", "Stage And Screen", "Soul", "Non Music", "Jazz", "Rock", "Metal"];
function si(e2) {
  return n(ri, e2);
}
function li(e2) {
  return n(() => [Lt(), Ut()], e2);
}
var ui = ["Amazon", "AOL", "Autodesk", "Apple", "Basecamp", "Battle.net", "Bitbucket", "bitly", "Box", "ClearScore", "Cloud Foundry", "Dailymotion", "Deutsche Telekom", "deviantART", "Discogs", "Discord", "Dropbox", "Etsy", "Evernote", "Facebook", "FatSecret", "Fitbit", "Flickr", "Formstack", "Foursquare", "GitHub", "GitLab", "Goodreads", "Google", "Google App Engine", "Groundspeak", "Huddle", "Imgur", "Instagram", "IntelCloud Services", "Jive Software", "Keycloak", "LinkedIn", "LoginRadius", "Microsoft services", "Mixi", "MySpace", "MoreTeam", "Netflix", "NetIQ", "Okta", "OpenAM", "OpenStreetMap", "OpenTable", "ORCID", "PayPal", "Ping Identity", "Pixiv", "Plurk", "Reddit", "Salesforce.com", "Sina Weibo", "Spotify", "Stack Exchange", "StatusNet", "Strava", "Stripe", "Trello", "Tumblr", "Twitch", "Twitter", "Ubuntu One", "Viadeo", "Vimeo", "VK", "WeChat", "Withings", "WooCommerce", "WordPress.com", "WSO2 Identity Server", "Xero", "XING", "Yahoo!", "Yammer", "Yandex", "Yelp", "Zendesk"];
function ci(e2) {
  return n(ui, e2);
}
function di(e2) {
  return n(() => {
    const e3 = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    return BigInt(e3.toString(8));
  }, e2);
}
var hi = ["Southwest", "Northwest", "Southeast", "Northeast"];
function mi(e2) {
  return n(hi, e2);
}
var pi = ["Quia sit architecto itaque voluptas aliquam. Rem veritatis qui quasi sint velit dolorem maxime voluptatem. Sit aut laboriosam aspernatur dicta non consequatur qui recusandae. Dignissimos voluptatem labore praesentium.", "Eveniet qui aperiam et. Rem incidunt sapiente architecto earum consectetur officia. Assumenda voluptatem sed aperiam sed temporibus sunt in. Totam molestiae aspernatur quia non rem facilis expedita harum veritatis. Culpa ipsam quo dolor.", "Perspiciatis distinctio quia est magni. Aliquid id sed qui quis eum amet ut iusto. Et eos repellat nisi doloremque. Non est aut dolores accusamus pariatur placeat amet dolor.", "Sint doloribus id voluptatem nulla dicta deserunt. Enim exercitationem aut modi saepe numquam ea. Voluptas mollitia non totam tempora delectus tenetur necessitatibus officiis. Odit vero consequatur qui dolorem et. Repellendus quia iure et dolorem.", "Error quos aperiam et dolor et sit occaecati. Qui minima officia pariatur dolorem sit. Et incidunt consequatur eaque unde sunt sit dolore. Et quia ut rerum. Fugit sunt architecto cupiditate voluptas.", "Consequatur praesentium vel optio facilis alias ea nesciunt. Soluta dolores facere eum ea quasi qui. Odit quisquam libero recusandae sit sit sed. Distinctio nihil omnis est sunt.", "Magni fugit perspiciatis aperiam ipsam dolorem minima. Magni ea qui quaerat harum quo repellat eos. Necessitatibus possimus quis fugit aut sed quis asperiores et.", "Perspiciatis illum illum et et error labore ut iure. Eius quidem eius placeat blanditiis in et deserunt. Eligendi fugiat vero nam asperiores sequi sit dignissimos. Quam rerum consequuntur dolor.", "Distinctio facere fugit vel nobis dolor voluptas vel quod in. Molestiae et velit. Maiores voluptatem ut qui eligendi repellat eos quia. Tempore ipsa voluptatem minus. In reiciendis dolorem deserunt consequatur at.", "Consectetur suscipit beatae est ut ut dolorem voluptas. Et sunt ratione. Consequatur illo et architecto.", "Quisquam at dolorem cupiditate enim ut recusandae porro aut quae. In nostrum et velit maiores dolores in architecto natus delectus. Aspernatur possimus libero velit omnis beatae. Libero adipisci et consequatur ullam. Aliquam est nam repudiandae odio. Eligendi vitae in beatae sint saepe ut eaque esse.", "Odit consequatur nobis aut quo dolores in adipisci praesentium. Quod rerum ducimus ad. Ut autem velit consequatur nihil animi animi architecto. Quaerat et sed.", "Vel provident ab nemo rerum consequatur fugiat. Voluptas facilis officia sint ullam omnis qui quis a. Nostrum atque laudantium delectus dolorum quod error.", "Veritatis officiis est occaecati sunt consequatur. Aut sapiente totam sed ad ad qui eum omnis deleniti. Quis blanditiis aperiam.", "Asperiores labore tempore quam. Ut voluptatem unde tempore fuga non repellendus omnis maxime. Quia soluta quibusdam. Commodi animi eum dolorem placeat sit. Quam nihil doloremque eligendi rem quibusdam iusto consequatur quae. Modi quaerat labore laboriosam quaerat sint nulla.", "Provident cumque quos quam enim. Nihil aperiam nihil ut. Blanditiis enim officia omnis quo tenetur aliquid odio et. Perspiciatis unde officiis ea expedita id dolorem. Quam nihil et amet quos et fugit. Cum voluptatem tempora deserunt.", "Ipsa nemo eos sequi nulla id accusamus nam ratione dolore. Omnis sint quisquam accusamus rem rem nihil. Non minus animi cum dolorem earum odit sequi. Rem non inventore sed dicta atque modi. Sed dolorem iste molestiae. Sed eum iste aliquid aliquid.", "Et quod ad optio culpa dicta at eveniet. Deserunt perferendis debitis sunt aut. Laboriosam laboriosam aspernatur id corporis.", "Et atque sunt ab esse excepturi ut quos delectus. Possimus dolor assumenda dicta sapiente quaerat nisi sed consequatur hic. In dolorem eos ut eum nam accusantium iure. Ipsam laborum deleniti ut.", "Et id harum unde et ratione minima non. Suscipit ipsum rem. Sed asperiores quaerat dolorum autem nihil voluptatem et hic ut. Molestiae rerum autem. Dolores nam soluta officia pariatur debitis.", "Alias esse minus. Molestiae et ut dolores iste. Nam sint aut. Explicabo ut earum modi accusamus facilis rerum.", "Sint id odit. Tenetur sit in deserunt voluptatem corporis voluptatum culpa eligendi. Est quia reprehenderit atque modi. Ipsum quo eos deserunt nobis.", "Molestias in reprehenderit molestias quam doloribus tenetur. Cupiditate enim ad est nemo et quos. Minus non et voluptatem magni voluptatibus consectetur temporibus ad. Molestiae sed voluptate et dolor eaque sequi minima. Quisquam atque distinctio culpa distinctio rerum labore vero assumenda voluptate.", "Quas quidem dolores eum aspernatur tempore illo deserunt veniam sed. Non est molestias omnis dolorem doloremque et exercitationem odit itaque. Aliquid nam eos rem maiores exercitationem similique rerum voluptatem voluptas. Dolor rerum ea hic esse inventore.", "Distinctio adipisci ex. Temporibus esse error ea aut est temporibus. Sunt laudantium recusandae. Soluta culpa nihil nemo sunt et repellat sapiente distinctio. Nostrum accusamus doloribus repellat blanditiis labore.", "Esse omnis enim odit. Veniam sed iusto. Voluptas libero accusamus. Corporis consequatur ut voluptas corporis blanditiis laudantium consequatur ea ducimus. Incidunt incidunt molestiae.", "Dignissimos nesciunt suscipit beatae et eveniet omnis voluptatum natus. Iusto minima commodi rem et a rerum asperiores. Fugit tenetur ut at aut molestias.", "Optio consectetur rerum eos reiciendis. Voluptatem hic iure. Unde aut voluptas.", "Culpa ipsa voluptatem suscipit ut omnis omnis iste. Molestias facere facilis delectus vel fugit quibusdam saepe. Vel ut et dignissimos fugiat sint aut magnam. Quis maiores harum aliquid modi consequuntur veniam ipsum quaerat. Quam quo iusto nulla. Et quasi qui dolore enim.", "Exercitationem similique magni voluptates. Amet et asperiores quidem error. Commodi nostrum hic suscipit fuga consequatur nobis veritatis sit.", "Quaerat officia voluptatum officiis. Quo velit numquam qui sint voluptatem eos magnam quas hic. Excepturi reprehenderit totam reprehenderit et fugit dolorum perferendis est. Quae repudiandae quisquam veniam maxime qui. Rerum aut dolores voluptates corrupti modi ducimus pariatur error tempore.", "Sed quam quo nesciunt et laboriosam. Aspernatur et eum voluptas nesciunt omnis distinctio occaecati eum aut. Occaecati mollitia et est. Reiciendis dolor et ut commodi est repellat ipsa iure. Minus laudantium ut sed earum odit. Laudantium et non iusto et aliquid.", "Repellat illo sunt cum. Maiores et iure. Accusantium eum quo ullam minus architecto aut nulla rerum. Non quis nisi omnis eos dolores quia. Beatae nihil hic ut necessitatibus id fugiat.", "Non consequuntur ut voluptatum. Dicta omnis architecto iure perspiciatis veritatis itaque dolore. Quos necessitatibus dolor nam.", "Et ipsam distinctio quia quia ipsum dignissimos autem assumenda qui. Vel earum harum provident consequatur. Neque animi architecto ratione. Veniam porro possimus nisi voluptas.", "Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit. Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.", "Et illo dolor cupiditate beatae. Eius eum recusandae odit placeat. Quibusdam error quisquam culpa pariatur praesentium et.", "Consequatur perferendis itaque dolor corporis vel voluptatem quaerat. Ex numquam sed. Reiciendis eveniet ducimus nobis et necessitatibus qui. Sit veritatis temporibus nostrum eius laborum voluptatum deleniti optio. Aperiam vel laborum eos odit ut veritatis. Eos tempora enim sed.", "Est iste totam accusamus dolorem est. Quis non sit impedit similique incidunt odio aspernatur aut rem. Architecto est eum.", "Aperiam autem non et aut illum ut nihil laborum omnis. Vitae et ab et. Cupiditate et est delectus. Mollitia qui qui dolores reiciendis perferendis voluptates maiores. Omnis corporis cumque sequi sequi excepturi velit laborum nobis. Neque id maiores voluptatem est debitis.", "Recusandae id nemo ut amet quas voluptas. Quas vero et molestiae esse. Eum qui quia nulla. Cum ipsa aut voluptate et iste ut porro adipisci. Quisquam error sed quasi voluptates ea nobis consequatur explicabo.", "Sunt velit facere fuga et voluptas inventore itaque. Necessitatibus ratione in esse. Quasi dignissimos quia est sequi incidunt enim reiciendis. At omnis iure in doloremque. Aut tempore consequatur facilis est ut distinctio est quas. Autem sunt est saepe quasi sed reprehenderit error magnam.", "Aliquid rerum tenetur exercitationem enim nihil laboriosam. Ut sequi sit dicta sequi non voluptatibus molestias rerum laudantium. Dolores beatae aut ipsa aut. Ut porro consequatur inventore praesentium quis. Omnis enim in voluptatem voluptatem quia.", "Tempora sunt enim. Sint ullam deleniti ut. Consequatur unde error odio quod fugit. Expedita unde commodi ratione sequi velit. Qui reprehenderit et tempora tenetur rerum. Veritatis consequatur odit sequi explicabo.", "Praesentium consequatur ut sit vel. Molestias fugiat quis cupiditate ipsa eos fugit est ullam. Sit labore et natus dolores ut quis eaque cupiditate. Et ut et et autem assumenda animi autem. Pariatur amet consequatur necessitatibus consequatur consequatur et explicabo sint. Nam sit dolore.", "Corporis distinctio delectus a ipsam commodi voluptas. Facilis minus sit numquam. Iusto quod consequatur molestias dolore dolor atque quidem distinctio. Voluptatem hic debitis sint ut sed recusandae qui consequatur. Nulla veritatis est.", "Deleniti dolor aliquam qui saepe officia nisi. Omnis sit molestiae ea rerum ratione. Dolorum ut corporis eligendi id dolorem totam et architecto voluptatem. Laudantium et vel. Dolores laborum sed quis sed et soluta. Et odio voluptate amet.", "Veniam commodi autem voluptatibus eos dolor quas reprehenderit. Praesentium cupiditate tempore et reprehenderit. Deleniti exercitationem illum maiores. Reprehenderit odio in ea voluptatem ut ut ullam.", "Labore corporis blanditiis dolorum nemo nam praesentium alias sequi inventore. Cupiditate rerum enim sint quis. Eum occaecati provident labore veniam deserunt vero sed soluta repellat. Cum sapiente pariatur et ea a recusandae et optio. Sequi doloribus reiciendis corrupti quidem accusamus est nesciunt. Excepturi accusamus consequatur est sed maiores excepturi autem.", "Assumenda molestiae laboriosam enim ipsum quaerat enim officia vel quo. Earum odit rem natus totam atque cumque. Sint dolorem facere non.", "Aut facere quaerat sapiente inventore libero impedit vero. Animi harum assumenda autem sint necessitatibus fugiat. Qui eligendi et ut distinctio.", "Vel amet eos voluptatibus vel expedita accusantium molestiae illo exercitationem. Assumenda ea voluptatem rerum. Accusantium sed totam aut et.", "Accusantium aliquid non neque dicta eum. Molestias nesciunt odit. Quis rerum et cumque distinctio a pariatur vel ea dicta.", "Tempora id non maxime. Qui qui dignissimos omnis adipisci qui. Voluptatibus ut labore est quisquam consequuntur fugiat harum tenetur est. Repellendus quisquam quaerat error nobis voluptatem nihil minima. Autem aliquid ut adipisci officia eos atque excepturi.", "Cupiditate voluptas cumque aspernatur. Adipisci voluptatibus vel eos. Doloremque commodi aliquid occaecati quia provident. Voluptatem tempore doloribus architecto rem quidem quaerat ipsam possimus. Laboriosam quisquam aut illo necessitatibus quo ducimus. Eum cupiditate sint a placeat dolores nemo.", "Beatae officiis nihil similique soluta non voluptas totam ad. Quam nobis enim vel qui ratione quos voluptatem molestiae est. Ipsum voluptate illo aliquid beatae blanditiis dolorem. Adipisci non libero laudantium. A aperiam distinctio tempora aspernatur.", "Eligendi corrupti occaecati et. Laboriosam molestiae dolore laborum consequuntur dolorem sit qui sit. Et placeat voluptas repudiandae expedita et. Dolores aut incidunt iure qui enim et quo fuga.", "Eos necessitatibus officia quos. Et vitae aliquid autem occaecati repudiandae placeat repellat odit. Minus iure voluptates autem quam dicta. Iste consequatur aspernatur voluptas quibusdam sint beatae.", "In reprehenderit esse id ut quas cupiditate error sit. Eum nostrum libero facilis quis error consectetur. Totam porro ut similique aut sint enim amet enim. Harum quo est repudiandae doloribus.", "Quis error sunt. Tempora magnam consequatur. Eum repellendus beatae dolores hic ut placeat voluptas commodi. Amet aliquid vero. Ullam ratione architecto.", "Inventore natus explicabo qui adipisci laborum voluptate molestias suscipit. Ullam quisquam assumenda nesciunt voluptatem in. Similique facere debitis mollitia autem fugit a quo et impedit.", "Vel facere dolorem sit hic non. Veniam nihil cumque sed et delectus. Maiores minus quisquam nostrum. Eius quasi nostrum. Molestiae recusandae ut. Suscipit natus aliquam eos sit aut.", "Incidunt accusamus vero. Ipsam reiciendis unde voluptatibus voluptates ab aliquam aut. Aut voluptas laudantium. Voluptatem beatae explicabo et eius. Commodi a autem omnis.", "Placeat tenetur ut enim similique et nam commodi. Dolores culpa enim. Fuga aliquid voluptatem repellat.", "Rerum enim tenetur maiores ullam et id assumenda est magnam. At praesentium molestias culpa fugiat et ipsum velit est et. Non velit ipsum quas laudantium accusantium sed qui id. Eum deserunt ratione veniam.", "Tempore explicabo laborum laboriosam officia velit aspernatur dolor cupiditate aperiam. Ab aliquid est. Veniam eius vel id rerum quisquam illo voluptates id.", "Quaerat veritatis tempora. Consectetur id fuga iusto voluptas quibusdam est. Et aut dolor est. Sunt mollitia libero.", "Voluptatem ipsa delectus corporis necessitatibus et et et eos debitis. Doloremque enim dolorum. Exercitationem ratione pariatur ut temporibus et est distinctio. Doloremque exercitationem dolores excepturi praesentium ut esse ut dolorum laboriosam. Itaque non aut quos nesciunt voluptatem voluptatem cupiditate.", "Tenetur doloremque at fuga eligendi mollitia modi placeat. Dolores corrupti repellendus et quos eos modi sunt. Quae non molestiae earum iusto magni. Molestiae quo fugit quisquam sed. Quia culpa rem minus distinctio.", "Molestias fugit perspiciatis voluptatem nihil assumenda doloribus. Reiciendis et aperiam ea fugiat ipsum atque omnis qui. Doloribus officiis quisquam optio nihil. Minus iure consequatur fugit quidem quae. Sit et ducimus culpa voluptatum officiis fugiat.", "Cupiditate eos ratione aperiam fuga temporibus. Ut nulla aliquid. Eos dolores eaque. Itaque est nostrum consequuntur sapiente qui delectus unde. Et ut et aut qui a ut ducimus ut. Mollitia quis rem dolorum in pariatur id velit.", "Ducimus omnis numquam. Eos ut quis. Autem numquam nihil ut quo est nam eius. Laboriosam sint nihil in dolorum et recusandae est. Inventore consequuntur at ratione dolores quas doloribus autem et. Qui atque delectus consectetur praesentium doloribus corporis expedita soluta.", "Quo voluptatem quia numquam laudantium sit quibusdam aut. Veritatis omnis neque ea saepe hic enim. Nam odit dolor non consequuntur perspiciatis inventore ut sint. Velit quod praesentium adipisci modi.", "Deserunt laboriosam quas autem repellat aspernatur ipsa accusamus pariatur deserunt. Nam aut eum vel ut. Sunt dicta id eveniet minus. Debitis temporibus quod.", "Ea aut aut sit. Incidunt ut quisquam laborum molestiae temporibus aut quam non. Voluptatibus quia laudantium et et quis quae voluptas accusantium. Doloremque in ab. Illo alias aut.", "Et veritatis rerum. Omnis repellat quo. Provident omnis consequatur provident tempore assumenda assumenda ducimus.", "Est sed deserunt eligendi in velit saepe. Dolorem quis illo vero qui ut recusandae occaecati dolores quae. Voluptatem vero aliquam alias adipisci reiciendis odit nobis est. Vel laboriosam quia commodi rerum. Voluptatum et sed et nesciunt iure ipsum iste aut enim.", "Corrupti aspernatur minus eum. Nihil omnis fuga doloremque eius ipsam saepe impedit. Nobis odio omnis laboriosam similique nostrum voluptas magnam commodi at. Magnam quibusdam dolore. Dolorem minima neque est amet voluptate explicabo similique quos. Rerum esse pariatur.", "Vel et molestiae quis ea modi quas tempore dolorum fuga. Aut dolore numquam et. Amet sit quibusdam ea blanditiis consectetur velit.", "Rerum aut expedita ad nam rerum. Animi sed in sunt enim. Rerum aspernatur ipsam quia consequatur sit est excepturi quidem voluptatem. Eum est et autem ducimus eius quod ipsa officia vero.", "Unde est nesciunt consequuntur magnam quo quia et fugiat. Totam sapiente iure eaque. Ut praesentium quisquam dolorem animi quibusdam quo nostrum facilis. Quasi quos et beatae architecto perferendis. Et laudantium officiis autem aut dolor iure et omnis.", "Similique molestiae id officia corporis quidem. Aliquam et ut eos ut nemo est voluptatem. Possimus ut quo labore. Alias amet quia enim. Quia ipsum pariatur facere illum esse recusandae veniam. Nihil enim fugit porro nam et quis sunt.", "Quis repellendus aspernatur magni non temporibus officiis et aliquid ut. Voluptas consectetur voluptatibus quos quas illo unde. Alias voluptas est. Inventore occaecati sed id minima fuga enim amet. Voluptatibus eius dolorum quam natus consectetur repellat rerum. Incidunt nisi hic consequatur iste iste velit.", "Minima soluta sed sed et optio explicabo at distinctio repudiandae. Magnam deleniti a ea. Non velit accusamus veniam qui. Necessitatibus velit ad aut officiis in officiis quasi. Sunt nulla dolores voluptatem esse magnam ut.", "Consequuntur nihil a id. Consequatur est cum excepturi aut labore odit quo molestiae molestiae. Soluta voluptatem ducimus cupiditate. Dolorum eveniet aliquid aut repudiandae et illo et. Harum unde ut harum accusamus suscipit quia.", "Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.", "Ea hic voluptatum omnis dolorum pariatur sed illo ea. Praesentium veniam vitae pariatur quae. Optio aspernatur aut ut recusandae.", "Ea tempora qui. Aut deserunt dolorum laborum rerum vel. Omnis et ut deserunt minima soluta adipisci sed voluptas.", "Dolor officia a fuga omnis sit. Ut atque est nostrum. Quos aut quo eos vel velit autem et aspernatur.", "Quo nihil assumenda corrupti nobis provident tenetur et. Molestiae unde explicabo nihil maxime. Quidem molestiae velit laborum amet rerum tenetur. Error non aspernatur suscipit asperiores voluptas ipsa dolor. Similique itaque omnis.", "Ut a voluptas labore et dolores magnam. Dolor deleniti dolores temporibus non autem. Voluptatibus numquam reiciendis nesciunt ipsa numquam enim. Unde velit optio quia.", "Libero quod eius. Ad libero qui omnis. Laudantium ut aperiam est exercitationem qui soluta aut ullam. Est dicta veniam voluptas est perspiciatis rerum. Alias ut autem est illo.", "Possimus molestiae mollitia alias reprehenderit autem saepe est odio qui. Odit est quos. Corrupti similique harum reiciendis. Placeat est at aut quo. Laudantium qui voluptatem nemo accusamus minima. Perferendis quos architecto repellat sed id quae iusto.", "Pariatur ut dolor repellendus dolores ut debitis. Est iusto neque dicta voluptatibus quia nulla consequatur. Omnis aut sed dolores qui laborum a amet.", "Veritatis fuga sit ut explicabo ab eos repellendus. Ipsa praesentium dolor. Tempora ipsum est dolorum nihil.", "Rerum quisquam qui repellendus totam nemo nihil odio. Tempore quam non vel molestiae veniam rem necessitatibus. Voluptas commodi recusandae vel illum eveniet ex. Dolore facilis illum atque explicabo.", "Ut quidem et. Quo assumenda et cumque molestias atque sint qui modi. Velit qui dolore possimus totam qui blanditiis. Vel quia consequatur aliquid corrupti qui libero.", "Est quo facilis voluptas aperiam. Natus dolores quas ratione enim repellendus. Illum dolor repellendus voluptas.", "Eveniet quae minus vero praesentium eos fugit explicabo et. Libero at ea ut sapiente et nesciunt odio similique vel. Libero aliquam tempore corporis eveniet dolorum nihil maiores veritatis. Harum modi sint officia.", "Repellendus et iste dolorem iste et perspiciatis occaecati vero eius. Vel ipsa officia quidem in maiores. Fugiat similique aliquam est eveniet ullam laborum qui. Et a maxime et magnam in."];
function yi(e2) {
  return n(pi, e2);
}
function gi(e2) {
  const a = e2?.size || 15;
  return n(() => b({ size: a }), e2);
}
function fi(e2) {
  const a = e2?.years ?? 1;
  if (a <= 0)
    throw new Error("Years must be positive, use future() instead");
  const t2 = 365 * a * 24 * 60 * 60 * 1e3, i2 = /* @__PURE__ */ new Date(), o2 = new Date(i2.getTime() - t2);
  return n(() => Q({ from: o2, to: i2 }), e2);
}
var bi = ["read", "write", "execute", "no permission"];
function wi(e2) {
  return n(e2?.numeric ? [0, 1, 2, 4] : bi, e2);
}
var vi = ["Dr.", "Miss", "Mr.", "Mrs.", "Ms."];
function ki(e2) {
  return n(vi, e2);
}
var Si = [{ formats: ["+247 ####"], countryCode: ["AC"] }, { formats: ["+376 ### ###"], countryCode: ["AD"] }, { formats: ["+971 ## ### ####", "+971 # ### ####"], countryCode: ["AE"] }, { formats: ["+93 ## ### ####"], countryCode: ["AF"] }, { formats: ["+1(268)### ####"], countryCode: ["AG"] }, { formats: ["+1(264)### ####"], countryCode: ["AI"] }, { formats: ["+355(###)### ###"], countryCode: ["AL"] }, { formats: ["+374 ## ### ###"], countryCode: ["AM"] }, { formats: ["+599 ### ####", "+599 9### ####"], countryCode: ["AN"] }, { formats: ["+244(###)### ###"], countryCode: ["AO"] }, { formats: ["+672 1## ###"], countryCode: ["AQ"] }, { formats: ["+54(###)### ####"], countryCode: ["AR"] }, { formats: ["+1(684)### ####"], countryCode: ["AS"] }, { formats: ["+43(###)### ####"], countryCode: ["AT"] }, { formats: ["+61 # #### ####"], countryCode: ["AU"] }, { formats: ["+297 ### ####"], countryCode: ["AW"] }, { formats: ["+994 ## ### ## ##"], countryCode: ["AZ"] }, { formats: ["+387 ## #####", "+387 ## ####"], countryCode: ["BA"] }, { formats: ["+1(246)### ####"], countryCode: ["BB"] }, { formats: ["+880 ## ### ###"], countryCode: ["BD"] }, { formats: ["+32(###)### ###"], countryCode: ["BE"] }, { formats: ["+226 ## ## ####"], countryCode: ["BF"] }, { formats: ["+359(###)### ###"], countryCode: ["BG"] }, { formats: ["+973 #### ####"], countryCode: ["BH"] }, { formats: ["+257 ## ## ####"], countryCode: ["BI"] }, { formats: ["+229 ## ## ####"], countryCode: ["BJ"] }, { formats: ["+1(441)### ####"], countryCode: ["BM"] }, { formats: ["+673 ### ####"], countryCode: ["BN"] }, { formats: ["+591 # ### ####"], countryCode: ["BO"] }, { formats: ["+55 ## #### ####", "+55 ## ##### ####"], countryCode: ["BR"] }, { formats: ["+1(242)### ####"], countryCode: ["BS"] }, { formats: ["+975 17 ### ###", "+975 # ### ###"], countryCode: ["BT"] }, { formats: ["+267 ## ### ###"], countryCode: ["BW"] }, { formats: ["+375(##)### ## ##"], countryCode: ["BY"] }, { formats: ["+501 ### ####"], countryCode: ["BZ"] }, { formats: ["+243(###)### ###"], countryCode: ["CD"] }, { formats: ["+236 ## ## ####"], countryCode: ["CF"] }, { formats: ["+242 ## ### ####"], countryCode: ["CG"] }, { formats: ["+41 ## ### ####"], countryCode: ["CH"] }, { formats: ["+225 ## ### ###"], countryCode: ["CI"] }, { formats: ["+682 ## ###"], countryCode: ["CK"] }, { formats: ["+56 # #### ####"], countryCode: ["CL"] }, { formats: ["+237 #### ####"], countryCode: ["CM"] }, { formats: ["+86(###)#### ####", "+86(###)#### ###", "+86 ## ##### #####"], countryCode: ["CN"] }, { formats: ["+57(###)### ####"], countryCode: ["CO"] }, { formats: ["+506 #### ####"], countryCode: ["CR"] }, { formats: ["+53 # ### ####"], countryCode: ["CU"] }, { formats: ["+238(###)## ##"], countryCode: ["CV"] }, { formats: ["+599 ### ####"], countryCode: ["CW"] }, { formats: ["+357 ## ### ###"], countryCode: ["CY"] }, { formats: ["+420(###)### ###"], countryCode: ["CZ"] }, { formats: ["+49(####)### ####", "+49(###)### ####", "+49(###)## ####", "+49(###)## ###", "+49(###)## ##", "+49 ### ###"], countryCode: ["DE"] }, { formats: ["+253 ## ## ## ##"], countryCode: ["DJ"] }, { formats: ["+45 ## ## ## ##"], countryCode: ["DK"] }, { formats: ["+1(767)### ####"], countryCode: ["DM"] }, { formats: ["+1(809)### ####", "+1(829)### ####", "+1(849)### ####"], countryCode: ["DO"] }, { formats: ["+213 ## ### ####"], countryCode: ["DZ"] }, { formats: ["+593 ## ### ####", "+593 # ### ####"], countryCode: ["EC"] }, { formats: ["+372 #### ####", "+372 ### ####"], countryCode: ["EE"] }, { formats: ["+20(###)### ####"], countryCode: ["EG"] }, { formats: ["+291 # ### ###"], countryCode: ["ER"] }, { formats: ["+34(###)### ###"], countryCode: ["ES"] }, { formats: ["+251 ## ### ####"], countryCode: ["ET"] }, { formats: ["+358(###)### ## ##"], countryCode: ["FI"] }, { formats: ["+679 ## #####"], countryCode: ["FJ"] }, { formats: ["+500 #####"], countryCode: ["FK"] }, { formats: ["+691 ### ####"], countryCode: ["FM"] }, { formats: ["+298 ### ###"], countryCode: ["FO"] }, { formats: ["+262 ##### ####", "+33 1 ## ## ## ##", "+33 2 ## ## ## ##", "+33 3 ## ## ## ##", "+33 4 ## ## ## ##", "+33 5 ## ## ## ##", "+33 6 ## ## ## ##", "+33 7 ## ## ## ##", "+508 ## ####", "+590(###)### ###"], countryCode: ["FR"] }, { formats: ["+241 # ## ## ##"], countryCode: ["GA"] }, { formats: ["+1(473)### ####"], countryCode: ["GD"] }, { formats: ["+995(###)### ###"], countryCode: ["GE"] }, { formats: ["+594 ##### ####"], countryCode: ["GF"] }, { formats: ["+233(###)### ###"], countryCode: ["GH"] }, { formats: ["+350 ### #####"], countryCode: ["GI"] }, { formats: ["+299 ## ## ##"], countryCode: ["GL"] }, { formats: ["+220(###)## ##"], countryCode: ["GM"] }, { formats: ["+224 ## ### ###"], countryCode: ["GN"] }, { formats: ["+240 ## ### ####"], countryCode: ["GQ"] }, { formats: ["+30(###)### ####"], countryCode: ["GR"] }, { formats: ["+502 # ### ####"], countryCode: ["GT"] }, { formats: ["+1(671)### ####"], countryCode: ["GU"] }, { formats: ["+245 # ######"], countryCode: ["GW"] }, { formats: ["+592 ### ####"], countryCode: ["GY"] }, { formats: ["+852 #### ####"], countryCode: ["HK"] }, { formats: ["+504 #### ####"], countryCode: ["HN"] }, { formats: ["+385 (##) ### ###", "+385 (##) ### ####", "+385 1 #### ###"], countryCode: ["HR"] }, { formats: ["+509 ## ## ####"], countryCode: ["HT"] }, { formats: ["+36(###)### ###"], countryCode: ["HU"] }, { formats: ["+62(8##)### ####", "+62(8##)### ###", "+62(8##)### ## ###", "+62 ## ### ##", "+62 ## ### ###", "+62 ## ### ####"], countryCode: ["ID"] }, { formats: ["+353(###)### ###"], countryCode: ["IE"] }, { formats: ["+972 5# ### ####", "+972 # ### ####"], countryCode: ["IL"] }, { formats: ["+91 ##### #####"], countryCode: ["IN"] }, { formats: ["+246 ### ####"], countryCode: ["IO"] }, { formats: ["+964(###)### ####"], countryCode: ["IQ"] }, { formats: ["+98(###)### ####"], countryCode: ["IR"] }, { formats: ["+354 ### ####"], countryCode: ["IS"] }, { formats: ["+39(0##)#### ## ##", "+39(0##)#### ###", "+39(0##)### ###", "+39(0##)## ###", "+39(0##)## ##", "+39(0#)## ##", "+39(3##)### ## ##", "+39(3##)## ## ##"], countryCode: ["IT"] }, { formats: ["+1(876)### ####"], countryCode: ["JM"] }, { formats: ["+962 # #### ####"], countryCode: ["JO"] }, { formats: ["+81 ## #### ####", "+81(###)### ###"], countryCode: ["JP"] }, { formats: ["+254 ### ######"], countryCode: ["KE"] }, { formats: ["+996(###)### ###"], countryCode: ["KG"] }, { formats: ["+855 ## ### ###"], countryCode: ["KH"] }, { formats: ["+686 ## ###"], countryCode: ["KI"] }, { formats: ["+269 ## #####"], countryCode: ["KM"] }, { formats: ["+1(869)### ####"], countryCode: ["KN"] }, { formats: ["+850 191 ### ####", "+850 ## ### ###", "+850 ### #### ###", "+850 ### ###", "+850 #### ####", "+850 #### #############"], countryCode: ["KP"] }, { formats: ["+82 ## ### ####"], countryCode: ["KR"] }, { formats: ["+965 #### ####"], countryCode: ["KW"] }, { formats: ["+1(345)### ####"], countryCode: ["KY"] }, { formats: ["+7(6##)### ## ##", "+7(7##)### ## ##"], countryCode: ["KZ"] }, { formats: ["+856(20##)### ###", "+856 ## ### ###"], countryCode: ["LA"] }, { formats: ["+961 ## ### ###", "+961 # ### ###"], countryCode: ["LB"] }, { formats: ["+1(758)### ####"], countryCode: ["LC"] }, { formats: ["+423(###)### ####"], countryCode: ["LI"] }, { formats: ["+94 ## ### ####"], countryCode: ["LK"] }, { formats: ["+231 ## ### ###"], countryCode: ["LR"] }, { formats: ["+266 # ### ####"], countryCode: ["LS"] }, { formats: ["+370(###)## ###"], countryCode: ["LT"] }, { formats: ["+352 ### ###", "+352 #### ###", "+352 ##### ###", "+352 ###### ###"], countryCode: ["LU"] }, { formats: ["+371 ## ### ###"], countryCode: ["LV"] }, { formats: ["+218 ## ### ###", "+218 21 ### ####"], countryCode: ["LY"] }, { formats: ["+212 ## #### ###"], countryCode: ["MA"] }, { formats: ["+377(###)### ###", "+377 ## ### ###"], countryCode: ["MC"] }, { formats: ["+373 #### ####"], countryCode: ["MD"] }, { formats: ["+382 ## ### ###"], countryCode: ["ME"] }, { formats: ["+261 ## ## #####"], countryCode: ["MG"] }, { formats: ["+692 ### ####"], countryCode: ["MH"] }, { formats: ["+389 ## ### ###"], countryCode: ["MK"] }, { formats: ["+223 ## ## ####"], countryCode: ["ML"] }, { formats: ["+95 ## ### ###", "+95 # ### ###", "+95 ### ###"], countryCode: ["MM"] }, { formats: ["+976 ## ## ####"], countryCode: ["MN"] }, { formats: ["+853 #### ####"], countryCode: ["MO"] }, { formats: ["+1(670)### ####"], countryCode: ["MP"] }, { formats: ["+596(###)## ## ##"], countryCode: ["MQ"] }, { formats: ["+222 ## ## ####"], countryCode: ["MR"] }, { formats: ["+1(664)### ####"], countryCode: ["MS"] }, { formats: ["+356 #### ####"], countryCode: ["MT"] }, { formats: ["+230 ### ####"], countryCode: ["MU"] }, { formats: ["+960 ### ####"], countryCode: ["MV"] }, { formats: ["+265 1 ### ###", "+265 # #### ####"], countryCode: ["MW"] }, { formats: ["+52(###)### ####", "+52 ## ## ####"], countryCode: ["MX"] }, { formats: ["+60 ## ### ####", "+60 11 #### ####", "+60(###)### ###", "+60 ## ### ###", "+60 # ### ###"], countryCode: ["MY"] }, { formats: ["+258 ## ### ###"], countryCode: ["MZ"] }, { formats: ["+264 ## ### ####"], countryCode: ["NA"] }, { formats: ["+687 ## ####"], countryCode: ["NC"] }, { formats: ["+227 ## ## ####"], countryCode: ["NE"] }, { formats: ["+672 3## ###"], countryCode: ["NF"] }, { formats: ["+234(###)### ####", "+234 ## ### ###", "+234 ## ### ##", "+234(###)### ####"], countryCode: ["NG"] }, { formats: ["+505 #### ####"], countryCode: ["NI"] }, { formats: ["+31 ## ### ####"], countryCode: ["NL"] }, { formats: ["+47(###)## ###"], countryCode: ["NO"] }, { formats: ["+977 ## ### ###"], countryCode: ["NP"] }, { formats: ["+674 ### ####"], countryCode: ["NR"] }, { formats: ["+683 ####"], countryCode: ["NU"] }, { formats: ["+64(###)### ###[#]", "+64 ## ### ###"], countryCode: ["NZ"] }, { formats: ["+968 ## ### ###"], countryCode: ["OM"] }, { formats: ["+507 ### ####"], countryCode: ["PA"] }, { formats: ["+51(###)### ###"], countryCode: ["PE"] }, { formats: ["+689 ## ## ##"], countryCode: ["PF"] }, { formats: ["+675(###)## ###"], countryCode: ["PG"] }, { formats: ["+63(###)### ####"], countryCode: ["PH"] }, { formats: ["+92(###)### ####"], countryCode: ["PK"] }, { formats: ["+48(###)### ###"], countryCode: ["PL"] }, { formats: ["+970 ## ### ####"], countryCode: ["PS"] }, { formats: ["+351 ## ### ####"], countryCode: ["PT"] }, { formats: ["+680 ### ####"], countryCode: ["PW"] }, { formats: ["+595(###)### ###"], countryCode: ["PY"] }, { formats: ["+974 #### ####"], countryCode: ["QA"] }, { formats: ["+262 ##### ####"], countryCode: ["RE"] }, { formats: ["+40 ## ### ####"], countryCode: ["RO"] }, { formats: ["+381 ## ### ####"], countryCode: ["RS"] }, { formats: ["+7(###)### ## ##"], countryCode: ["RU"] }, { formats: ["+250(###)### ###"], countryCode: ["RW"] }, { formats: ["+966 5 #### ####", "+966 # ### ####"], countryCode: ["SA"] }, { formats: ["+677 ### ####", "+677 #####"], countryCode: ["SB"] }, { formats: ["+248 # ### ###"], countryCode: ["SC"] }, { formats: ["+249 ## ### ####"], countryCode: ["SD"] }, { formats: ["+46 ## ### ####"], countryCode: ["SE"] }, { formats: ["+65 #### ####"], countryCode: ["SG"] }, { formats: ["+290 ####", "+290 ####"], countryCode: ["SH"] }, { formats: ["+386 ## ### ###"], countryCode: ["SI"] }, { formats: ["+421(###)### ###"], countryCode: ["SK"] }, { formats: ["+232 ## ######"], countryCode: ["SL"] }, { formats: ["+378 #### ######"], countryCode: ["SM"] }, { formats: ["+221 ## ### ####"], countryCode: ["SN"] }, { formats: ["+252 ## ### ###", "+252 # ### ###", "+252 # ### ###"], countryCode: ["SO"] }, { formats: ["+597 ### ####", "+597 ### ###"], countryCode: ["SR"] }, { formats: ["+211 ## ### ####"], countryCode: ["SS"] }, { formats: ["+239 ## #####"], countryCode: ["ST"] }, { formats: ["+503 ## ## ####"], countryCode: ["SV"] }, { formats: ["+1(721)### ####"], countryCode: ["SX"] }, { formats: ["+963 ## #### ###"], countryCode: ["SY"] }, { formats: ["+268 ## ## ####"], countryCode: ["SZ"] }, { formats: ["+1(649)### ####"], countryCode: ["TC"] }, { formats: ["+235 ## ## ## ##"], countryCode: ["TD"] }, { formats: ["+228 ## ### ###"], countryCode: ["TG"] }, { formats: ["+66 ## ### ####", "+66 ## ### ###"], countryCode: ["TH"] }, { formats: ["+992 ## ### ####"], countryCode: ["TJ"] }, { formats: ["+690 ####"], countryCode: ["TK"] }, { formats: ["+670 ### ####", "+670 77# #####", "+670 78# #####"], countryCode: ["TL"] }, { formats: ["+993 # ### ####"], countryCode: ["TM"] }, { formats: ["+216 ## ### ###"], countryCode: ["TN"] }, { formats: ["+676 #####"], countryCode: ["TO"] }, { formats: ["+90(###)### ####"], countryCode: ["TR"] }, { formats: ["+1(868)### ####"], countryCode: ["TT"] }, { formats: ["+688 90####", "+688 2####"], countryCode: ["TV"] }, { formats: ["+886 # #### ####", "+886 #### ####"], countryCode: ["TW"] }, { formats: ["+255 ## ### ####"], countryCode: ["TZ"] }, { formats: ["+380(##)### ## ##"], countryCode: ["UA"] }, { formats: ["+256(###)### ###"], countryCode: ["UG"] }, { formats: ["+44 #### ######"], countryCode: ["GB", "UK"] }, { formats: ["+598 # ### ## ##"], countryCode: ["UY"] }, { formats: ["+998 ## ### ####"], countryCode: ["UZ"] }, { formats: ["+39 6 698 #####"], countryCode: ["VA"] }, { formats: ["+1(784)### ####"], countryCode: ["VC"] }, { formats: ["+58(###)### ####"], countryCode: ["VE"] }, { formats: ["+1(284)### ####"], countryCode: ["VG"] }, { formats: ["+1(340)### ####"], countryCode: ["VI"] }, { formats: ["+84 ## #### ###", "+84(###)#### ###"], countryCode: ["VN"] }, { formats: ["+678 ## #####", "+678 #####"], countryCode: ["VU"] }, { formats: ["+681 ## ####"], countryCode: ["WF"] }, { formats: ["+685 ## ####"], countryCode: ["WS"] }, { formats: ["+967 ### ### ###", "+967 # ### ###", "+967 ## ### ###"], countryCode: ["YE"] }, { formats: ["+27 ## ### ####"], countryCode: ["ZA"] }, { formats: ["+260 ## ### ####"], countryCode: ["ZM"] }, { formats: ["+263 # ######"], countryCode: ["ZW"] }, { formats: ["+1(###)### ####"], countryCode: ["US", "CA"] }];
function Ci(e2) {
  const a = e2?.countryCode ?? X(), t2 = Si.find((e3) => e3.countryCode.includes(a))?.formats || Si.map(({ formats: e3 }) => e3).flat();
  return n(Array.from({ length: e2?.length || 1 }, () => _t({ mask: r(t2) })), e2);
}
var Ai = ["Try to program the GB interface, maybe it will copy the wireless hard drive!", "Try to bypass the GB panel, maybe it will synthesize the back-end transmitter!", "If we program the protocol, we can get to the SDD application through the virtual RAM pixel!", "Use the open-source THX application, then you can quantify the solid state transmitter!", "You cant transmit the firewall without copying the 1080p SDD interface!", "Ill compress the open-source SAS bandwidth, that should array the FTP port!", "programming the alarm wont do anything, we need to hack the solid state ADP transmitter!", "calculating the interface wont do anything, we need to bypass the mobile IB panel!", "Try to calculate the GB transmitter, maybe it will quantify the online pixel!", "If we calculate the circuit, we can get to the HDD driver through the optical XML panel!", "navigating the program wont do anything, we need to calculate the cross-platform SMS capacitor!", "Try to calculate the JBOD firewall, maybe it will override the redundant port!", "If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!", "You cant override the capacitor without indexing the bluetooth PNG pixel!", "quantifying the microchip wont do anything, we need to index the online SQL hard drive!", "connecting the port wont do anything, we need to program the haptic RSS pixel!", "We need to back up the 1080p JBOD bandwidth!", "If we index the card, we can get to the SMS hard drive through the bluetooth AGP bus!", "Ill compress the optical SDD hard drive, that should interface the XSS bandwidth!", "You cant copy the feed without compressing the primary JBOD circuit!", "If we back up the application, we can get to the TCP bus through the auxiliary FTP hard drive!", "Try to override the RSS port, maybe it will quantify the haptic port!", "We need to calculate the bluetooth JBOD bus!", "bypassing the bus wont do anything, we need to program the wireless SDD driver!", "Try to parse the PCI capacitor, maybe it will quantify the bluetooth interface!", "copying the monitor wont do anything, we need to synthesize the back-end ADP application!", "Try to index the PNG card, maybe it will transmit the neural system!", "Try to bypass the SCSI sensor, maybe it will generate the 1080p card!", "We need to calculate the open-source SDD driver!", "If we reboot the port, we can get to the RSS application through the 1080p SQL microchip!", "Use the cross-platform AI system, then you can connect the digital card!", "We need to navigate the virtual SSL transmitter!", "The JSON hard drive is down, bypass the redundant firewall so we can copy the FTP port!", "We need to navigate the haptic JBOD system!", "We need to generate the virtual USB pixel!", "Ill override the digital ADP alarm, that should microchip the USB firewall!", "We need to bypass the redundant RAM pixel!", "Ill compress the cross-platform EXE card, that should circuit the AGP sensor!", "The AGP protocol is down, compress the open-source card so we can override the XML program!", "Ill reboot the bluetooth GB capacitor, that should card the HDD panel!", "Ill connect the neural IB matrix, that should array the CSS card!", "The EXE matrix is down, transmit the wireless matrix so we can index the RAM pixel!", "The THX monitor is down, reboot the auxiliary array so we can parse the XML microchip!", "Try to override the HDD firewall, maybe it will generate the open-source panel!", "We need to index the digital JBOD bus!", "Use the multi-byte THX firewall, then you can back up the digital system!", "Use the 1080p IB feed, then you can reboot the haptic feed!", "Try to bypass the SAS card, maybe it will transmit the solid state system!", "Try to quantify the TCP array, maybe it will index the virtual transmitter!", "Ill override the cross-platform PCI port, that should driver the FTP card!", "If we override the bandwidth, we can get to the SMTP capacitor through the cross-platform RSS alarm!", "Use the redundant AGP transmitter, then you can generate the 1080p circuit!", "Use the auxiliary EXE monitor, then you can hack the haptic port!", "Try to synthesize the SCSI card, maybe it will back up the 1080p circuit!", "We need to transmit the auxiliary GB sensor!", "Use the mobile GB transmitter, then you can quantify the wireless system!", "Try to quantify the SQL application, maybe it will bypass the primary pixel!", "You cant override the protocol without programming the mobile RAM card!", "The JBOD port is down, program the wireless array so we can input the PCI program!", "Use the auxiliary JSON card, then you can copy the optical matrix!", "We need to calculate the wireless TCP circuit!", "Use the back-end AI firewall, then you can parse the optical program!", "navigating the hard drive wont do anything, we need to synthesize the auxiliary USB circuit!", "Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!", "If we back up the sensor, we can get to the JBOD matrix through the optical EXE alarm!", "Try to generate the TCP bus, maybe it will override the neural bandwidth!", "The ADP protocol is down, parse the 1080p card so we can reboot the ADP application!", "calculating the driver wont do anything, we need to generate the optical SMTP feed!", "Ill calculate the 1080p XML transmitter, that should alarm the RSS firewall!", "You cant connect the interface without programming the virtual PNG protocol!", "Use the cross-platform THX array, then you can parse the primary capacitor!", "generating the sensor wont do anything, we need to hack the solid state AI bus!", "Try to calculate the JBOD program, maybe it will synthesize the mobile system!", "We need to program the back-end PNG pixel!", "Ill program the virtual XML microchip, that should transmitter the SDD protocol!", "If we hack the firewall, we can get to the USB application through the bluetooth SDD system!", "Use the auxiliary SDD system, then you can input the redundant hard drive!", "The GB port is down, quantify the mobile circuit so we can hack the SMTP system!", "You cant quantify the driver without transmitting the multi-byte SQL microchip!", "Try to parse the SMTP array, maybe it will generate the multi-byte port!", "copying the system wont do anything, we need to calculate the virtual SSL circuit!", "Use the bluetooth TCP capacitor, then you can reboot the open-source hard drive!", "If we navigate the card, we can get to the ADP array through the open-source IB feed!", "Try to input the HTTP feed, maybe it will reboot the mobile capacitor!", "If we input the driver, we can get to the RAM monitor through the 1080p GB bus!", "Ill calculate the wireless ADP port, that should bandwidth the SSL microchip!", "Use the haptic XSS driver, then you can connect the wireless program!", "quantifying the circuit wont do anything, we need to parse the back-end FTP interface!", "Ill reboot the online COM interface, that should system the THX protocol!", "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!", "Ill program the back-end THX matrix, that should interface the HDD panel!", "Ill generate the virtual SQL protocol, that should bus the AI hard drive!", "We need to calculate the mobile AGP panel!", "Ill compress the back-end PCI circuit, that should monitor the PNG driver!", "We need to quantify the primary TCP matrix!", "Ill synthesize the primary AI capacitor, that should array the JBOD sensor!", "You cant hack the card without indexing the primary XSS capacitor!", "The TCP feed is down, compress the cross-platform alarm so we can synthesize the XSS array!", "The JSON interface is down, hack the haptic transmitter so we can bypass the XML system!", "Use the online SDD protocol, then you can parse the open-source bandwidth!"];
function Mi(e2) {
  return n(Ai, e2);
}
function Ti(e2) {
  return n(() => k({ min: 0, max: 65535 }), e2);
}
function Bi(e2) {
  return n(() => v4_default({ random: k({ min: 0, max: 255, length: 16 }) }), e2);
}
function Ii(e2) {
  const a = { withAccents: e2?.withAccents };
  return n(() => {
    let t2 = `${e2?.firstName ?? va(a)} ${e2?.lastName ?? Sa(a)}`.replace(" ", n([".", "_"]));
    return v() && (t2 += k({ min: 0, max: 100 })), t2;
  }, e2);
}
var Pi = ["King Drives", "Georgiana Throughway", "Antonietta Highway", "Elian Road", "Reynold Crossing", "Max Wall", "Lehner Drive", "Graham Walks", "Buckridge Drives", "Schimmel Fields", "Doyle Expressway", "Cade Forks", "Myriam Spur", "Fannie Loaf", "Dorian Gateway", "Ruecker Fields", "Daugherty Center", "Emerald Key", "Jazmyn Isle", "Viviane Junctions", "Price Spring", "Aracely Row", "Chyna Plaza", "Harmon Lodge", "Konopelski Inlet", "Dave Stravenue", "Goyette Circle", "Stokes Wells", "Arturo Manors", "Schumm Land", "Bechtelar Fields", "Natalia Points", "Dianna Inlet", "Curt Locks", "Durgan Parkways", "Dante Summit", "Hilma Mills", "Stiedemann Field", "Genesis Plaza", "Carmelo Plaza", "Gutkowski Ferry", "Abbott Square", "Hodkiewicz Oval", "Heathcote Cliff", "Calista Via", "Kihn Expressway", "Caesar Place", "Lockman Greens", "Brisa Hill", "Quigley Parkways", "Howell Vista", "Fisher Light", "Tremblay Springs", "Stroman Turnpike", "Howell Plaza", "Wilma Greens", "Adell Mews", "Shakira Crossroad", "Moises Causeway", "Frances Groves", "Sammy Creek", "Wolf Glen", "Fay Corners", "Collins Lane", "Smitham Drive", "Cronin Shoal", "Missouri Extension", "Leffler Fields", "Laurianne Glens", "Parker Ways", "Benny River", "Kreiger Mission", "Dameon Mountain", "Emard Hill", "Quitzon Green", "Corwin Mission", "Rosendo Spring", "Carter Pike", "Harber Village", "Jade Shore", "Dariana Junction", "Beer Plaza", "Hauck Stream", "Joshuah Fork", "Rath Walk", "Eugenia Heights", "Kuphal Mountain", "Zboncak Harbor", "Torphy Fords", "Jocelyn Throughway", "Cole Center", "Forest Path", "Oswald Junction", "King Springs", "Zulauf Branch", "Esteban Inlet", "Conner Vista", "Zboncak Center", "Glover Lights", "Rohan Tunnel"];
function xi(e2) {
  return n(Pi, e2);
}
function Di(e2) {
  return n(() => `${k({ min: 0, max: 1500 })} ${xi()}`, e2);
}
function Gi(e2) {
  return n(() => {
    let e3 = "" + k({ min: 1e4, max: 99999 });
    return v() && (e3 += "-" + k({ min: 1e3, max: 9999 })), e3;
  }, e2);
}
function Fi(e2) {
  const a = e2?.includeCounty ?? true, t2 = e2?.includeCountry ?? true;
  return n(() => {
    const e3 = { street: Di(), city: ke(), zipCode: Gi() };
    return a && (e3.county = De()), t2 && (e3.country = Pe()), e3;
  }, e2);
}
function qi(e2) {
  return n(() => {
    const e3 = va({ withAccents: false }), a = Sa({ withAccents: false });
    return { id: Bi(), email: Ca({ firstName: e3, lastName: a }), firstName: e3, lastName: a, phone: Ci(), img: N(), username: Ii({ firstName: e3, lastName: a }), address: Fi() };
  }, e2);
}
function Li(e2) {
  const a = e2?.charCount ?? 10;
  if (a < 1 || isNaN(a))
    throw "Character count must be greater than 0";
  return n(() => {
    let e3 = Ht();
    if (1 === a)
      return w();
    for (; e3.length < a; )
      e3 += ` ${Ht()}`;
    return e3 = e3.substring(0, a - 2), e3 += `${w()}.`, e3;
  }, e2);
}
function Ri(e2) {
  return n(() => ({ id: Bi(), title: Li({ charCount: 40 }), body: Li({ charCount: 500 }), comments: Array.from({ length: k({ min: 1, max: 5 }) }, () => ({ id: Bi(), text: Li({ charCount: 100 }), user: qi() })) }), e2);
}
var Ei = ["low", "medium", "high", "critical", "urgent", "major", "moderate", "minor"];
function Hi(e2) {
  return n(Ei, e2);
}
var Wi = ["Small Rubber Shoes", "Fantastic Wooden Sausages", "Handmade Frozen Salad", "Intelligent Soft Car", "Intelligent Concrete Chips", "Handcrafted Concrete Bacon", "Small Fresh Fish", "Rustic Metal Towels", "Unbranded Cotton Hat", "Fantastic Frozen Bike", "Generic Rubber Shirt", "Unbranded Wooden Keyboard", "Awesome Metal Computer", "Gorgeous Fresh Shoes", "Unbranded Concrete Sausages", "Practical Wooden Ball", "Ergonomic Soft Towels", "Small Plastic Table", "Awesome Metal Pants", "Licensed Steel Sausages", "Handcrafted Rubber Bike", "Ergonomic Cotton Computer", "Generic Wooden Ball", "Fantastic Frozen Soap", "Generic Plastic Keyboard", "Awesome Cotton Pizza", "Licensed Metal Chips", "Handcrafted Cotton Towels", "Handmade Plastic Tuna", "Practical Granite Keyboard", "Intelligent Concrete Soap", "Rustic Concrete Chips", "Fantastic Steel Hat", "Rustic Cotton Chair", "Gorgeous Metal Pants", "Intelligent Metal Bacon", "Handmade Rubber Car", "Tasty Concrete Keyboard", "Incredible Granite Hat", "Practical Rubber Fish", "Rustic Cotton Gloves", "Rustic Cotton Ball", "Refined Fresh Shirt", "Generic Granite Sausages", "Rustic Granite Fish", "Practical Wooden Bacon", "Sleek Plastic Chair", "Handcrafted Fresh Mouse", "Small Concrete Shoes", "Awesome Fresh Chair", "Incredible Soft Computer", "Tasty Concrete Chips", "Generic Rubber Sausages", "Intelligent Concrete Chicken", "Rustic Soft Ball", "Awesome Steel Towels", "Incredible Fresh Bike", "Unbranded Granite Chicken", "Rustic Concrete Bike", "Small Frozen Sausages", "Intelligent Plastic Gloves", "Ergonomic Frozen Towels", "Refined Frozen Ball", "Refined Cotton Ball", "Licensed Steel Salad", "Intelligent Wooden Bacon", "Unbranded Metal Shoes", "Fantastic Granite Car", "Ergonomic Granite Bacon", "Awesome Wooden Shirt", "Rustic Wooden Pizza", "Tasty Frozen Table", "Awesome Wooden Hat", "Awesome Rubber Salad", "Licensed Concrete Fish", "Fantastic Soft Cheese", "Rustic Frozen Pizza", "Refined Concrete Tuna", "Small Frozen Tuna", "Licensed Granite Cheese", "Practical Rubber Car", "Rustic Steel Sausages", "Awesome Concrete Hat", "Awesome Granite Sausages", "Sleek Plastic Chips", "Handcrafted Wooden Gloves", "Intelligent Metal Computer", "Fantastic Fresh Sausages", "Fantastic Plastic Salad", "Unbranded Steel Sausages", "Handcrafted Wooden Fish", "Sleek Wooden Bacon", "Unbranded Plastic Towels", "Tasty Soft Sausages", "Generic Metal Shirt", "Handmade Granite Cheese", "Small Fresh Bacon", "Tasty Granite Towels", "Licensed Steel Chips"];
function Ni(e2) {
  return n(Wi, e2);
}
var zi = ["Bostons most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The Football Is Good For Training And Recreational Purposes", "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients"];
function Ki(e2) {
  return n(zi, e2);
}
var Oi = ["Antiques", "Appliances", "Automotive Parts & Accessories", "Automotive Parts", "Baby & Personal Care", "Books", "CDs & Vinyl", "Clothing", "Collectibles", "Computers & Tablets", "Crafts", "Electronics", "Garden", "Grocery", "Health & Beauty", "Kindle", "Movies & TV", "Musical Instruments", "Smartphones & Accessories", "Sporting Goods", "Toys", "Video Games"];
function Ji(e2) {
  return n(Oi, e2);
}
function Vi(e2) {
  return n(() => ({ id: Bi(), title: Ni(), description: Ki(), price: s({ fraction: 2 }).toString(), category: Ji(), image: bt(), rating: { rate: s({ min: 0.1, max: 5, fraction: 1 }).toString(), count: s({ min: 0, max: 1e4 }).toString() } }), e2);
}
var Ui = ["Awesome", "Rustic", "Small", "Gorgeous", "Fantastic", "Sleek", "Intelligent", "Unbranded", "Refined", "Licensed", "Generic", "Practical", "Ergonomic", "Handcrafted", "Tasty", "Handmade", "Incredible"];
function ji(e2) {
  return n(Ui, e2);
}
var _i = ["Metal", "Plastic", "Rubber", "Frozen", "Soft", "Concrete", "Granite", "Fresh", "Steel", "Cotton", "Wooden"];
function Yi(e2) {
  return n(_i, e2);
}
var Qi = ["Python", "Java", "JavaScript", "C", "C++", "C#", "PHP", "Kotlin", "R", "TypeScript", "Abap", "Swift", "Objective-C", "VBA", "Matlab", "Go", "Scala", "Ruby", "Groovy", "Dart", "Cobol", "Visual Basic", "Perl", "Julia", "Rust", "Lua", "Lisp", "Haskell", "Delphi"];
function $i(e2) {
  return n(Qi, e2);
}
var Zi = ["They/Them", "She/Her", "He/Him", "Ze/Hir"];
function Xi(e2) {
  return n(Zi, e2);
}
var eo = ["https", "http", "tcp", "udp", "ip", "pop", "smtp", "dhcp", "l2tp", "ftp", "imap"];
var ao = ["Hyper Text Transfer Protocol Secure", "Hyper Text Transfer Protocol", "Transmission Control Protocol", "User Datagram Protocol", "Internet Protocol", "Post office Protocol", "Simple mail transport Protocol", "Dynamic Host Configuration Protoco", "Layer Two Tunnelling Protocol", "File Transfer Protocol", "Internet Message Access Protocol"];
function to(e2) {
  return n(e2?.fullName ? ao : eo, e2);
}
var io = ["A stumble may prevent a fall.", "Put your future in good hands your own.", "What you see depends on what you're looking for.", "Worry gives a small thing a big shadow.", "To get something you never had, you have to do something you never did.", "Be thankful when you don't know something for it gives you the opportunity to learn.", "Letting go is not the end of the world; it is the beginning of a new life.", "Our greatest glory is not in never failing but rising everytime we fall.", "Being right is highly overrated. Even a stopped clock is right twice a day.", "Love is not blind; it simply enables one to see things others fail to see.", "If you get up one more time than you fall, you will make it through.", "Don't focus on making the right decision, focus on making the decision the right one.", "Love is just a word until someone comes along and gives it meaning.", "We all have problems. The way we solve them is what makes us different.", "Invent your world. Surround yourself with people, color, sounds, and work that nourish you.", "Every day may not be good, but there's something good in every day.", "Some people think it's holding that makes one strong sometimes it's letting go.", "Why worry about things you cannot control when you can keep yourself busy controlling the things that depend on you?", "It is better to take many small steps in the right direction than to make a great leap forward only to stumble backward.", "As the rest of the world is walking out the door, your best friends are the ones walking in.", "Why compare yourself with others? No one in the entire world can do a better job of being you than you.", "A good teacher is like a candle it consumes itself to light the way for others.", "Life is not measured by the breaths we take, but by the moments that take our breath.", "The real measure of your wealth is how much youd be worth if you lost all your money.", "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending.", "A friend is someone who understands your past, believes in your future, and accepts you just the way you are.", "Giving up doesn't always mean you are weak. Sometimes it means that you are strong enough to let go.", "Never miss an opportunity to make others happy, even if you have to leave them alone in order to do it.", "Yesterday is history. Tomorrow is a mystery. And today? Today is a gift that's why they call it the present.", "When you don't know what you believe, everything becomes an argument. Everything is debatable. But when you stand for something, decisions are obvious.", "Every sixty seconds you spend angry, upset or mad, is a full minute of happiness you will never get back.", "If we are facing in the right direction, all we have to do is keep on walking.", "Peace of mind is not the absence of conflict from life, but the ability to cope with it.", "An obstacle may be either a stepping stone or a stumbling block.", "I've never seen a smiling face that was not beautiful.", "Kindness is the greatest wisdom.", "Don't miss all the beautiful colors of the rainbow looking for that pot of gold.", "You don't drown by falling in water. You drown by staying there.", "Never be afraid to try, remember... Amateurs built the ark, Professionals built the Titanic.", "A smile is a light in the window of your face to show your heart is at home.", "You may only be someone in the world, but to someone else, you may be the world.", "A bend in the road is not the end of the road...unless you fail to make the turn.", "One who asks a question is a fool for five minutes; one who does not ask a question remains a fool forever.", "Courage is the discovery that you may not win, and trying when you know you can lose.", "A good rest is half the work.", "All the flowers of all the tomorrows are in the seeds of today.", "A man is not where he lives but where he loves.", "The world does not happen to you it happens from you.", "More powerful than the will to win is the courage to begin.", "What we see is mainly what we look for.", "Don't wait for people to be friendly. Show them how.", "Don't let today's disappointments cast a shadow on tomorrow's dreams.", "Never let lack of money interfere with having fun.", "He who has health has hope, and he who has hope has everything.", "The difficulties of life are intended to make us better, not bitter.", "Change your words. Change your world.", "Open minds lead to open doors.", "Each time we face a fear, we gain strength, courage, and confidence in the doing.", "If you come to a fork in the road, take it.", "Nobody can do everything, but everybody can do something.", "Why worry about tomorrow, when today is all we have?", "Most smiles are started by another smile.", "When you lose, don't lose the lesson.", "If I could reach up and hold a star for every time you've made me smile, the entire evening sky would be in the palm of my hand.", "The steeper the mountain the harder the climb the better the view from the finishing line", "Don't let what you can't do stop you from doing what you can do.", "You can never cross the ocean unless you have the courage to lose sight of the shore.", "The best place to find a helping hand is at the end of your own arm.", "Don't fear failure so much that you refuse to try new things. The saddest summary of life contains three descriptions: could have, might have, and should have.", "We cannot direct the wind but we can adjust the sails.", "Giving up doesn't always mean you are weak; sometimes it means that you are strong enough to let go.", "Many people have gone further than they thought they could because someone else thought they could.", "Never tell me the sky is the limit when there are footprints on the moon.", "Count your joys instead of your woes. Count your friends instead of your foes.", "Beware of the half truth. You may have gotten hold of the wrong half.", "It's not who you are that holds you back, it's who you think you're not.", "Choosing to be positive and having a grateful attitude is going to determine how you're going to live your life.", "My attitude is that if you push me towards something that you think is a weakness, then I will turn that perceived weakness into a strength.", "Weakness of attitude becomes weakness of character.", "Nothing can stop the man with the right mental attitude from achieving his goal nothing on earth can help the man with the wrong mental attitude.", "Attitude is a little thing that makes a big difference.", "Your attitude, not your aptitude, will determine your altitude.", "There is little difference in people, but that little difference makes a big difference. The little difference is attitude. The big difference is whether it is positive or negative.", "Develop an attitude of gratitude, and give thanks for everything that happens to you, knowing that every step forward is a step toward achieving something bigger and better than your current situation.", "Everything can be taken from a man but one thing: the last of human freedoms - to choose one's attitude in any given set of circumstances, to choose one's own way.", "A positive attitude causes a chain reaction of positive thoughts, events and outcomes. It is a catalyst and it sparks extraordinary results.", "Morality is simply the attitude we adopt towards people whom we personally dislike.", "It is not the body's posture, but the heart's attitude that counts when we pray.", "People may hear your words, but they feel your attitude.", "But the attitude of faith is to let go, and become open to truth, whatever it might turn out to be.", "Character is the result of two things: mental attitude and the way we spend our time.", "Our attitude towards others determines their attitude towards us.", "Adopting the right attitude can convert a negative stress into a positive one.", "Take the attitude of a student, never be too big to ask questions, never know too much to learn something new.", "The reactionary is always willing to take a progressive attitude on any issue that is dead.", "Ability is what you're capable of doing. Motivation determines what you do. Attitude determines how well you do it.", "Cock your hat - angles are attitudes.", "When you pray for anyone you tend to modify your personal attitude toward him.", "If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception, it is a prevailing attitude.", "I'm only going to stand before God and give an account for my life, not for somebody else's life. If I have a bad attitude, then I need to say there's no point in me blaming you for what's wrong in my life.", "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.", "My attitude is, if someone's going to criticize me, tell me to my face.", "Having a positive mental attitude is asking how something can be done rather than saying it can't be done.", "My general attitude to life is to enjoy every minute of every day. I never do anything with a feeling of, 'Oh God, I've got to do this today.'", "A complainer is like a Death Eater because there's a suction of negative energy. You can catch a great attitude from great people.", "The meaning of things lies not in the things themselves, but in our attitude towards them.", "Pink isn't just a color, it's an attitude!", "The remarkable thing is, we have a choice everyday regarding the attitude we will embrace for that day.", "A positive attitude can really make dreams come true - it did for me.", "Good humor is one of the best articles of dress one can wear in society.", "When you are thwarted, it is your own attitude that is out of order.", "I think it's my adventure, my trip, my journey, and I guess my attitude is, let the chips fall where they may.", "Bad attitudes will ruin your team.", "For success, attitude is equally as important as ability.", "Happiness is an attitude of mind, born of the simple determination to be happy under all outward circumstances.", "Great effort springs naturally from great attitude.", "Attitudes are more important than facts.", "Attitude is everything.", "Attitude determines the altitude of life.", "Our attitude toward life determines life's attitude towards us.", "The greatest discovery of my generation is that man can alter his life simply by altering his attitude of mind.", "But my attitude about it is I have miles to go before I sleep.", "The attitude is very important. Because, your behavior radiates how you feel.", "When you ain't got no money, you gotta get an attitude.", "Civilization is a method of living, an attitude of equal respect for all men.", "Most of us start out with a positive attitude and a plan to do our best.", "There are no menial jobs, only menial attitudes.", "Funny is an attitude.", "The biggest challenge is how to affect public attitudes and make people care.", "If you don't like something, change it. If you can't change it, change your attitude.", "It is very important to generate a good attitude, a good heart, as much as possible. From this, happiness in both the short term and the long term for both yourself and others will come.", "Your living is determined not so much by what life brings to you as by the attitude you bring to life not so much by what happens to you as by the way your mind looks at what happens.", "Happiness doesn't depend on any external conditions, it is governed by our mental attitude.", "Whenever you're in conflict with someone, there is one factor that can make the difference between damaging your relationship and deepening it. That factor is attitude.", "Keep a good attitude and do the right thing even when it's hard. When you do that you are passing the test. And God promises you your marked moments are on their way.", "Success or failure depends more upon attitude than upon capacity successful men act as though they have accomplished or are enjoying something. Soon it becomes a reality. Act, look, feel successful, conduct yourself accordingly, and you will be amazed at the positive results.", "Like success, failure is many things to many people. With Positive Mental Attitude, failure is a learning experience, a rung on the ladder, a plateau at which to get your thoughts in order and prepare to try again.", "The only disability in life is a bad attitude.", "If you have a positive attitude and constantly strive to give your best effort, eventually you will overcome your immediate problems and find you are ready for greater challenges.", "You cannot control what happens to you, but you can control your attitude toward what happens to you, and in that, you will be mastering change rather than allowing it to master you.", "The greatest discovery of all time is that a person can change his future by merely changing his attitude.", "A healthy attitude is contagious but don't wait to catch it from others. Be a carrier.", "Any fact facing us is not as important as our attitude toward it, for that determines our success or failure. The way you think about a fact may defeat you before you ever do anything about it. You are overcome by the fact because you think you are.", "Excellence is not a skill. It is an attitude.", "I hope the millions of people I've touched have the optimism and desire to share their goals and hard work and persevere with a positive attitude.", "We cannot change our past. We can not change the fact that people act in a certain way. We can not change the inevitable. The only thing we can do is play on the one string we have, and that is our attitude.", "I was looking for something a lot heavier, yet melodic at the same time. Something different from heavy metal, a different attitude.", "Spend some time this weekend on home improvement improve your attitude toward your family.", "We awaken in others the same attitude of mind we hold toward them.", "There is little difference in people, but that little difference makes a big difference. That little difference is attitude. The big difference is whether it is positive or negative.", "Ability is what you're capable of doing. Motivation determines what you do. Attitude determines how well you do it.", "The last of human freedoms - the ability to chose one's attitude in a given set of circumstances.", "Attitude is more important than the past, than education, than money, than circumstances, than what people do or say. It is more important than appearance, giftedness, or skill.", "Being black is not a matter of pigmentation - being black is a reflection of a mental attitude.", "People in tough times - it doesn't mean they don't have a great attitude.", "A strong positive mental attitude will create more miracles than any wonder drug.", "Certain thoughts are prayers. There are moments when, whatever be the attitude of the body, the soul is on its knees.", "Leadership is practiced not so much in words as in attitude and in actions.", "If a person gets his attitude toward money straight, it will help straighten out almost every other area in his life.", "I've reached a point in my life where it's the little things that matter... I was always a rebel and probably could have got much farther had I changed my attitude. But when you think about it, I got pretty far without changing attitudes. I'm happier with that.", "Fairness is not an attitude. It's a professional skill that must be developed and exercised.", "I think whether you're having setbacks or not, the role of a leader is to always display a winning attitude.", "Be sure what you want and be sure about yourself. Fashion is not just beauty, it's about good attitude. You have to believe in yourself and be strong.", "Hitler and Mussolini were only the primary spokesmen for the attitude of domination and craving for power that are in the heart of almost everyone. Until the source is cleared, there will always be confusion and hate, wars and class antagonisms.", "There must be something solemn, serious, and tender about any attitude which we denominate religious. If glad, it must not grin or snicker if sad, it must not scream or curse.", "Sales are contingent upon the attitude of the salesman - not the attitude of the prospect.", "A positive attitude is not going to save you. What it's going to do is, everyday, between now and the day you die, whether that's a short time from now or a long time from now, that every day, you're going to actually live.", "Always keep that happy attitude. Pretend that you are holding a beautiful fragrant bouquet.", "Black Consciousness is an attitude of the mind and a way of life, the most positive call to emanate from the black world for a long time.", "I think music is the greatest art form that exists, and I think people listen to music for different reasons, and it serves different purposes. Some of it is background music, and some of it is things that might affect a person's day, if not their life, or change an attitude. The best songs are the ones that make you feel something.", "We submit to the majority because we have to. But we are not compelled to call our attitude of subjection a posture of respect.", "The winner's edge is not in a gifted birth, a high IQ, or in talent. The winner's edge is all in the attitude, not aptitude. Attitude is the criterion for success.", "Having a clear faith, based on the creed of the church is often labeled today as fundamentalism. Whereas relativism, which is letting oneself be tossed and swept along by every wind of teaching, look like the only attitude acceptable to today's standards.", "Today's students can put dope in their veins or hope in their brains. If they can conceive it and believe it, they can achieve it. They must know it is not their aptitude but their attitude that will determine their altitude.", "I think a lot of times we don't pay enough attention to people with a positive attitude because we assume they are naive or stupid or unschooled.", "A great attitude does much more than turn on the lights in our worlds it seems to magically connect us to all sorts of serendipitous opportunities that were somehow absent before the change.", "Chaotic people often have chaotic lives, and I think they create that. But if you try and have an inner peace and a positive attitude, I think you attract that.", "I am Classic Rock Revisited. I revisit it every waking moment of my life because it has the spirit and the attitude and the fire and the middle finger. I am Rosa Parks with a Gibson guitar.", "And the attitude of faith is the very opposite of clinging to belief, of holding on.", "Our lives are not determined by what happens to us but how we react to what happens, not by what life brings us but the attitude we bring to life.", "Being a sex symbol has to do with an attitude, not looks. Most men think it's looks, most women know otherwise.", "I am responsible. Although I may not be able to prevent the worst from happening, I am responsible for my attitude toward the inevitable misfortunes that darken life.", "No rational argument will have a rational effect on a man who does not want to adopt a rational attitude.", "When I was a child I asked my mother what homosexuality was about and she said - and this was 100 years ago in Germany and she was very open-minded - 'It's like hair color. It's nothing. Some people are blond and some people have dark hair. It's not a subject.' This was a very healthy attitude.", "Success or failure in business is caused more by the mental attitude even than by mental capacities.", "Obama does not represent America. Nor does he represent anything what our forefathers stood for. This country is basically built on an attitude. It's a way of life. It's not because you're born here. It's not that you're supposed to take from those who have and give to those who haven't. That kills a country. It killed Russia.", "Stop this attitude that older people ain't any good anymore! We're as good as we ever were - if we ever were any good.", "My attitude to peace is rather based on the Burmese definition of peace - it really means removing all the negative factors that destroy peace in this world. So peace does not mean just putting an end to violence or to war, but to all other factors that threaten peace, such as discrimination, such as inequality, poverty.", "Your attitude is like a box of crayons that color your world. Constantly color your picture gray, and your picture will always be bleak. Try adding some bright colors to the picture by including humor, and your picture begins to lighten up.", "Crime is terribly revealing. Try and vary your methods as you will, your tastes, your habits, your attitude of mind, and your soul is revealed by your actions.", "Some people say I have attitude - maybe I do... but I think you have to. You have to believe in yourself when no one else does - that makes you a winner right there.", "The minute you try to talk business with him he takes the attitude that he is a gentleman and a scholar, and the moment you try to approach him on the level of his moral integrity he starts to talk business.", "Stiletto, I look at it more as an attitude as opposed to a high-heeled shoe.", "If somebody says no to you, or if you get cut, Michael Jordan was cut his first year, but he came back and he was the best ever. That is what you have to have. The attitude that I'm going to show everybody, I'm going to work hard to get better and better.", "When you have vision it affects your attitude. Your attitude is optimistic rather than pessimistic.", "What matters to me is that I do what I think is right and I see, I'm a numbers guy, that's my attitude. I know we have a debt tsunami coming, we are bankrupting this country and I'm in a position where I can actually advance ideas to prevent that from happening. That's exactly what I should be doing.", "I developed a nutty attitude where I'd think, If some guy really loves me he doesn't care if I'm fat. I'd come up with all these stupid reasons why it would be OK to be fat.", "Really you just gotta keep chugging along and keep a positive attitude and get through all the problems. You gotta face them, otherwise you don't get through.", "Solidarity is an attitude of resistance, I suppose, or it should be.", "There's always the motivation of wanting to win. Everybody has that. But a champion needs, in his attitude, a motivation above and beyond winning.", "Americans are the most generous country on the planet. I've worked in Europe, I've worked in Australia. There is no where else where you get absolutely no attitude for being a foreigner. If you do your job well, they embrace you.", "When I go to the clinic next and sit with a tube in my arm and watch the poison go in, I'm in an attitude of abject passivity. It doesn't feel like fighting at all it just feels like submitting.", "Our judgments judge us, and nothing reveals us, exposes our weaknesses, more ingeniously than the attitude of pronouncing upon our fellows.", "Pessimism only describes an attitude, and not facts, and hence is entirely subjective.", "I was kicked out of school because of my attitude. I was not assimilating. So I went to work, taking any jobs I could get.", "A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.", "So long as you've got your friends about you, and a good positive attitude, you don't really have to care what everyone else thinks.", "I separated from the Southern Baptists when they adopted the discriminatory attitude towards women, because I believe what Paul taught in Galatians that there is no distinction in God's eyes between men and women, slaves and masters, Jews and non-Jews - everybody is created equally in the eyes of God.", "My attitude toward men who mess around is simple: If you find 'em, kill 'em.", "Prayer is talking with God. God knows your heart and is not so concerned with your words as He is with the attitude of your heart.", "You can't study comedy it's within you. It's a personality. My humor is an attitude.", "You call to a dog and a dog will break its neck to get to you. Dogs just want to please. Call to a cat and its attitude is, 'What's in it for me?'", "The compulsion to do good is an innate American trait. Only North Americans seem to believe that they always should, may, and actually can choose somebody with whom to share their blessings. Ultimately this attitude leads to bombing people into the acceptance of gifts.", "I keep guitars that are, you know, the neck's a little bit bent and it's a little bit out of tune. I want to work and battle it and conquer it and make it express whatever attitude I have at that moment. I want it to be a struggle.", "Most of my arguments with musicians through the years have had more to do with their attitude about music, or their attitude about their own lives, or their personal responsibility. Music has never really been the big centerpiece of the fight.", "I love everybody. One of the great things about me is that I have a very positive attitude.", "Mankind's true moral test, its fundamental test (which lies deeply buried from view), consists of its attitude towards those who are at its mercy: animals. And in this respect mankind has suffered a fundamental debacle, a debacle so fundamental that all others stem from it.", "It's sort of a mental attitude about critical thinking and curiosity. It's about mindset of looking at the world in a playful and curious and creative way.", "Punk was defined by an attitude rather than a musical style.", "It's a fundamental, social attitude that the 1% supports symphonies and operas and doesn't support Johnny learning to program hip-hop beats. When I put it like that, it sounds like, 'Well, yeah,' but you start to think, 'Why not, though?' What makes one more valuable than another?", "I think people feel threatened by homosexuality. The problem isn't about gay people, the problem is about the attitude towards gay people. People think that all gays are Hannibal Lecters. But gay people are sons and daughters, politicians and doctors, American heroes and daughters of American heroes.", "I have this theory that, depending on your attitude, your life doesn't have to become this ridiculous charade that it seems so many people end up living.", "It was just like a dream. I could have ended up with an album that's not all that different from anything else coming out of Nashville. Mutt made the difference. He took these songs, my attitude, my creativity, and colored them in a way that is unique.", "I look at Jagger and the like and if I see a good attitude I'll admire it but I wouldn't copy their style.", "My attitude is never to be satisfied, never enough, never.", "Today's youth are told to get rich or die trying and they really shouldn't take that attitude forward with them.", "The purely agitational attitude is not good enough for a detailed consideration of a subject.", "Not every religion has to have St. Augustine's attitude to sex. Why even in our culture marriages are celebrated in a church, everyone present knows what is going to happen that night, but that doesn't prevent it being a religious ceremony.", "Never refuse an assignment except when there is a conflict of interest, a potential of danger to you or your family, or you hold a strongly biased attitude about the subject under focus.", "We can revolutionize the attitude of inner city brown and black kids to learning. We need a civil rights movement within the African-American community.", "It's a question of keeping one's eyes and ears open and watching how other people play the game. They're watching me too, to see what my attitude is like.", "Yes, we're still five little people with a noisy attitude.", "In individual industries where female labour pays an important role, any movement advocating better wages, shorter working hours, etc., would not be doomed from the start because of the attitude of those women workers who are not organized.", "On 'Van Halen,' I was a young punk, and everything revolved around the fastest kid in town, gunslinger attitude. But I'd say that at the time of 'Fair Warning,' I started concentrating more on songwriting. But I guess in most people's minds I'm just a gunslinger.", "Design is about point of view, and there should be some sort of woman or lifestyle or attitude in one's head as a designer.", "Liberalism is an attitude rather than a set of dogmas - an attitude that insists upon questioning all plausible and self-evident propositions, seeking not to reject them but to find out what evidence there is to support them rather than their possible alternatives.", "The Dolls were an attitude. If nothing else they were a great attitude.", "I was impressed by Hendrix. His attitude was brilliant. Even the way he walked was amazing.", "The best way to inspire people to superior performance is to convince them by everything you do and by your everyday attitude that you are wholeheartedly supporting them.", "I think it's your mental attitude. So many of us start dreading age in high school and that's a waste of a lovely life. 'Oh... I'm 30, oh, I'm 40, oh, 50.' Make the most of it.", "The attitude that nature is chaotic and that the artist puts order into it is a very absurd point of view, I think. All that we can hope for is to put some order into ourselves.", "Britishness is just a way of putting things together and a certain don't care attitude about clothes. You don't care, you just do it and it looks great.", "It remains to consider what attitude thoughtful men and Christian believers should take respecting them, and how they stand related to beliefs of another order.", "Surfers have the most attitude.", "I've never run into a guy who could win at the top level in anything today and didn't have the right attitude, didn't give it everything he had, at least while he was doing it wasn't prepared and didn't have the whole program worked out.", "That's what I love from metal, and that's what I love from hip-hop. That's what I love from any music that's hard, that's got an edge to it-The attitude in it.", "That attitude that fighting is probably not fair, but you have to defend yourself anyway and damage the enemy, has been profoundly consequential as far as my political activism goes.", "Seek out that particular mental attribute which makes you feel most deeply and vitally alive, along with which comes the inner voice which says, 'This is the real me,' and when you have found that attitude, follow it.", "People think, 'She's a model. She must have such an attitude. She must be so stuck up.' But I'm normal. I cry. I'm not rich. I drive a 1987 Chevrolet Celebrity.", "My grandfather was a man, when he talked about freedom, his attitude was really interesting. His view was that you had obligations or you had responsibilities, and when you fulfilled those obligations or responsibilities, that then gave you the liberty to do other things.", "I think failure is nothing more than life's way of nudging you that you are off course. My attitude to failure is not attached to outcome, but in not trying. It is liberating. Most people attach failure to something not working out or how people perceive you. This way, it is about answering to yourself.", "Part of our western outlook stems from the scientific attitude and its method of isolating the parts of a phenomenon in order to analyze them.", "There is a single thread of attitude, a single direction of flow, that joins our present time to its early burgeoning in Mediterranean civilization.", "We live in a country that used to have a can-do attitude, and now we have a 'what-can-you-do-for-me?' attitude, and what I try to do is find ways that we can develop common ground.", "Could we change our attitude, we should not only see life differently, but life itself would come to be different.", "The ideal attitude is to be physically loose and mentally tight.", "An attitude to life which seeks fulfillment in the single-minded pursuit of wealth - in short, materialism - does not fit into this world, because it contains within itself no limiting principle, while the environment in which it is placed is strictly limited.", "You may not be able to change a situation, but with humor you can change your attitude about it.", "What was past was past. I suppose that was the general attitude.", "Iraq is just a symbol of the attitude of western democracies to the rest of the world.", "I don't mean this in a stuck-up way, but I needed an attitude song.", "I met my grandfather just before he died, and it was the first time that I had seen Dad with a relative of his. It was interesting to see my own father as a son and the body language and alteration in attitude that comes with that, and it sort of changed our relationship for the better.", "I don't think it's a good attitude in your life to feel that you have to be rich to have self-esteem.", "All we need, really, is a change from a near frigid to a tropical attitude of mind.", "An aristocratic culture does not advertise its emotions. In its forms of expression it is sober and reserved. Its general attitude is stoic.", "I was impressed by Hendrix. Not so much by his playing, as his attitude - he wasn't a great player, but everything else about him was brilliant.", "Attitude is attitude, whether you're a West Coast gangster or East Coast gangster, you know?", "You know, I always say white is not a colour, white is an attitude, and if you haven't got trillions of dollars in the bank that you don't need, you can't be white.", "Being a part of SKECHERS is exciting. It is such a hip company with a great attitude and image.", "It is precisely the purpose of the public opinion generated by the press to make the public incapable of judging, to insinuate into it the attitude of someone irresponsible, uninformed.", "Coaches will eventually notice a great attitude, and they respect that.", "The novelist teaches the reader to comprehend the world as a question. There is wisdom and tolerance in that attitude. In a world built on sacrosanct certainties the novel is dead.", "No one's going to be able to operate without a grounding in the basic sciences. Language would be helpful, although English is becoming increasingly international. And travel. You have to have a global attitude.", "My second husband believed I had such a fickle attitude to friendship that each Friday he would update the list of my 'Top Ten' friends in the manner of a Top Of The Pops chart countdown.", "If you can kill animals, the same attitude can kill human beings. The mentality is the same which exploits nature and which creates wars.", "My attitude is, do as much as I can while I'm free. And if I'm arrested I'll still do as much as I can.", "There are a lot of movies I'd like to throw away. That's not to say that I went in with that attitude. Any film I ever started, I went in with all the hope and best intentions in the world, but some films just don't work.", "By making a comeback, I'm changing the attitude of people toward me. If I'd known that people would react so enthusiastically, I'd have done it years ago.", "Today, I think the attitude is that governing is not necessarily good politics, and the result is that it's much more partisan and much more divided.", "That term's definitely got a negative aura to it, because people think a diva is somebody with an attitude who demands things all the time. Of course there is that type of diva, but my idea of a diva has always been a singer - whether male or female - who gets on that stage and captivates you with their presence and their voice.", "Oh, I don't think Tom Sowell would tell anybody to join the administration. That's not his style. But I think his attitude has always been if it had to be done he'd prefer me to do it than somebody else.", "The Senator from Massachusetts has given us ample grounds to doubt the judgment and the attitude he brings to bear on vital issues of national security.", "I perfectly understood President Obama's attitude throughout the French presidential campaign. He had no reason to distance himself from Nicolas Sarkozy. It's the basic solidarity that leaders who worked together owe to each other.", "I think it has something to do with being British. We don't take ourselves as seriously as some other countries do. I think a lot of people take themselves far too seriously I find that a very tedious attitude.", "I failed the LSAT. Basically, if I had not failed, I'd have been a lawyer and there would be no Spanx. I think failure is nothing more than life's way of nudging you that you are off course. My attitude to failure is not attached to outcome, but in not trying. It is liberating.", "My attitude to writing is like when you do wallpapering, you remember where all the little bits are that don't meet. And then your friends say: It's terrific!", "Liberalism is a really old British tradition and it has a completely different attitude towards the individual and the relationship between the individual and the state than the collectivist response of Labour, and particularly Old Labour, does.", "I've always had a 'Work hard, play hard' attitude to life - I still do - but sometimes you get involved in something that needs a calm, methodical approach.", "I've always considered myself to be fiercely patriotic. I love Britain - its history and the down-to-earth attitude people have.", "There is a brief moment when all there is in a man's mind and soul and spirit is reflected through his eyes, his hands, his attitude. This is the moment to record.", "I was fortunate to play for Pete Rose and have teammates like Ken Griffey Sr., Tony Perez and Dave Concepcion. I grew up in the game with a mature attitude. I've always known it was better to be seen and not heard.", "I've never been out with any of the cast of Coronation Street. We're all very close friends so it's very much a professional attitude.", "Nothing. We're all friends and friendly. So when the cameras go down, depending on the mood or the nature of the material we're dealing with, there's usually a kind of a prevailing light attitude that's floating around.", "I will keep smiling, be positive and never give up! I will give 100 percent each time I play. These are always my goals and my attitude.", "I'm taking a bit of a wait-and-see attitude towards 3D.", "My father instilled in me the attitude of prevailing. If there's a challenge, go for it. If there's a wall to break down, break it down.", "Just as the left has to be more willing to question 'Government knows best,' the right has to rethink its laissez-faire attitude toward government.", "The attitude of insolent haughtiness is characteristic of the relationships Americans form with what is alien to them, with others.", "Although as a sailor I despised politics - for I loved my sailor's life and still love it today - conditions forced me to take up a definite attitude towards political problems.", "How do you nurture a positive attitude when all the statistics say you're a dead man? You go to work.", "The pilot looked at his cues of attitude and speed and orientation and so on and responded as he would from the same cues in an airplane, but there was no way it flew the same. The simulators had showed us that.", "It was my father who instilled the 'never say no' attitude I carry around with me today, and who instilled in me a sense of wonder, always taking us on adventures in the car, never telling us the destination.", "I went to England in the '70s, and I was in my early 20s. There was still a residue of that era of being an underclass or colonial. I assume it must have been a more aggressive and prominent attitude 40 years before that, because Australia internationally wasn't regarded as having much cultural value. We were a country full of sheep and convicts.", "For a writer only one form of patriotism exists: his attitude toward language.", "Gardening is not trivial. If you believe that it is, closely examine why you feel that way. You may discover that this attitude has been forced upon you by mass media and the crass culture it creates and maintains. The fact is, gardening is just the opposite - it is, or should be, a central, basic expression of human life.", "Becoming an author changes your attitude too. Once you see where books come from, and how they're made, they never seem quite as sacred again.", "I was bringing my attitude as a regular person 'cause this is my attitude.", "If you can attribute your success entirely to your own mental effort, to your own attitude, to some spiritual essence that you have that is better than other people's, then that must feel pretty good.", "I fell in love with Erica Kane the summer before my freshman year of high school. Like all red-blooded teen American boys, I'd come home from water polo practice and eat a box of Entenmann's Pop'Ems donut holes in front of the TV while obsessively fawning over 'All My Children' and Erica, her clothes, and her narcissistic attitude.", "Films for TV have to be much closer to the book, mainly because the objective with a TV movie that translates literature is to get the audience, after seeing this version, to pick up the book and read it themselves. My attitude is that TV can never really be any form of art, because it serves audience expectations.", "You can't beat the beehive for glam punkette attitude.", "I haven't seen Clones, which has been during this period when I haven't seen much of anything, but I did see Phantom Menace, and see my feelings about it - see, first of all, I think that when you make a lot of movies, your attitude about the movies changes.", "My attitude is always one of sensuality, aggressive enthusiasm and a kind of outrageousness in my expression.", "Epic poetry exhibits life in some great symbolic attitude. It cannot strictly be said to symbolize life itself, but always some manner of life.", "When you retire, it's a place in life, a part of the journey. You just don't quit work you develop an attitude where you can do what you please.", "When a parent shows up with an attitude of entitlement, understand that under it is a boatload of anxiety.", "What reader wants to be told what attitude to strike?", "My denial and irresponsible attitude about asthma put me at great risk and caused me so much needless suffering. My hope is that the kids I talk to learn to open up about their asthma, become educated about their condition, and seek help.", "Woman must have her freedom, the fundamental freedom of choosing whether or not she will be a mother and how many children she will have. Regardless of what man's attitude may be, that problem is hers - and before it can be his, it is hers alone.", "Even as a little child, I've always had that comedian kind of attitude.", "I mean, the shoe - there is a music to it, there is attitude, there is sound, it's a movement. Clothes - it's a different story. There are a million things I'd rather do before designing clothes: directing, landscaping.", "In just the same way the thousands of successive positions of a runner are contracted into one sole symbolic attitude, which our eye perceives, which art reproduces, and which becomes for everyone the image of a man who runs.", "In the late '70s, maybe just before I started, there was still an attitude that if you did film you didn't do TV and vice versa, but that's gone now.", "I cannot say that the attitude of the United Nations always is for the Israeli attitude. Israel, I think, has been under severe attacks by members of the United Nations many times.", "I love her attitude, but as much as I'd like to bring my medals to a speech or appearance, I never do.", "We must advertise to U.S. business that we are there, that our attitude has changed, and that we care. When we are asked to help, we have to perform and provide the right advice.", "The American attitude towards efficiency and execution should always underlie architecture.", "I have such an extreme attitude about work, where I can just completely be derelict of my responsibilities and then when I am not derelict, I am completely indulged in it. I swing pretty wildly from the two extremes.", "I have a political attitude, but I'm certainly not a politician.", "I think my attitude to human beings has changed since leaving prison.", "I went to the Performing Arts School and studied classical ballet. That attitude is something that's put into your head. You are never thin enough.", "I have always detested any departure from reality, an attitude which I relate to my mother's poor mental health.", "With just about every player in Australia, his whole goal and ambition is to play for Australia. That's why they're playing first class cricket. It's just a different attitude.", "Right after 'Raymond' I had a world-is-my-oyster attitude, but I found out I don't like oysters. I had this existential emptiness. 'What is my purpose? Who am I?' I had a big identity crisis.", "What sculptors do is represent the essence of gesture. What is important in mime is attitude.", "It really was hand-to-mouth and you can say, 'Poor little me, how dreadful, what a deprived childhood', but I didn't feel that way at all. It's all about the attitude at home.", "Having a clear faith, based on the creed of the church is often labeled today as fundamentalism. Whereas relativism, which is letting oneself be tossed and swept along by every wind of teaching, look like the only attitude acceptable to today's standards.", "You know what's funny to me? Attitude.", "The characteristic political attitude of today is not one of positive belief, but of despair.", "If you can't change your fate, change your attitude.", "Mainly what I learned from Buddy... was an attitude. He loved music, and he taught me that it shouldn't have any barriers to it.", "I think fun is an important part of the entertainment industry, and it should be. Anybody who's not incorporating some of that into their work needs to take a break, go away, and have an attitude adjustment.", "I have played on many teams throughout my career, and I know when a team has the tools, and the right positive attitude towards winning.", "Vampires are so old that they don't need to impress anyone anymore. They're comfortable in their own skin. It's this enigmatic strength that's very romantic and old-fashioned. I think it goes back to something of a Victorian attitude of finding a strong man who's going to look after his woman.", "What I wish I had, is that I wish I was a little more Greek, in that I wish I could lose my North American driven attitude and that I could be a little bit more poetic and laissez faire.", "I was always the guy getting kicked out of my classes at school for having an attitude problem.", "And I tell you, having girls has made me a much better man. I have friends who are fathers, but they only have boys, and they have the same attitude toward women they always had, you know? And I don't play that... My girls, you mess with them? I will bury you underground.", "Style is a reflection of your attitude and your personality.", "If a person can be said to have the wrong attitude, there is no need to pay attention to his arguments.", "The attitude is we live and let live. This is actually an amazing change in values in a rather short time and it's an example of freedom from religion.", "Not to discriminate every moment some passionate attitude in those about us, and in the very brilliancy of their gifts some tragic dividing on their ways, is, on this short day of frost and sun, to sleep before evening.", "Players should know that if you can't make the contribution of the winning shot, that your attitude every day when you come to practice, or the positive contribution you make through cheering and keeping up team morale, is just as important in the overall picture.", "It's not the style that motivates me, as much as an attitude of openness that I have when I go into a project.", "The place of chess in the society is closely related to the attitude of young people towards our game.", "We assume that we've come so far as compassionate citizens of the world if we do choose to read the news, yet the attitude towards life can be one where we put blinders on and forget that there are civil wars going on. It's easy to forget that there are so many people starving to death every single day.", "The jokes are great but what really matters for a comedian is his performance, his whole attitude, and the laughs that he gets between the jokes rather than on top of the jokes.", "There were a few teachers who just did not like me because of my face. Once, I was told to stand in the corner until I cheered up. The attitude was, 'Oh, for God's sake, what's the matter with him?' But it's just a natural expression.", "I'm just part of a tradition of people who aren't pleased. I would never think anyone else who has the same attitude was getting it from me. I'd just think they're... sensible.", "The key to life is your attitude. Whether you're single or married or have kids or don't have kids, it's how you look at your life, what you make of it. It's about making the best of your life wherever you are in life.", "If you get a diagnosis, get on a therapy, keep a good attitude and keep your sense of humor.", "When a woman puts on a heel, she has a different posture, a different attitude. She really stands up and has a consciousness of her body.", "Whenever I'm having a bad day and have an attitude, I stay home. I keep it at home.", "You don't have to have an attitude if you're famous.", "I need that aggressive attitude to play my music and more men have that attitude than women.", "But Jesus changes your attitude towards yourself and towards other people.", "But I think bands that rolled in with a big attitude, like they were some big deal, I just found that very strange.", "What irritates me is the bland way people go around saying, 'Oh, our attitude has changed. We don't dislike these people any more.' But by the strangest coincidence, they haven't taken away the injustice the laws are still on the books.", "There is definitely something sexy about a girl with an attitude and a pair of leather pants.", "The phenomenon of home schooling is a wonderful example of the American can-do attitude. Growing numbers of parents have become disenchanted with government-run public schools. Many parents have simply taken matters into their own hands, literally.", "Regardless of what one's attitude towards prohibition may be, temperance is something against which, at a time of war, no reasonable protest can be made.", "At home in Ireland, there's a habit of avoidance, an ironical attitude towards the authority figure.", "Even if people do wrong, we're social animals, so what can we do about stopping them doing the same things in future? Saying people are 'bad' or 'evil' is just an unwillingness to engage an unwillingness to try to empathise. That sanctimonious attitude doesn't help anyone.", "People have often asked if I'm gay because I don't go out of my way to spit and scratch and give people attitude.", "I don't return anybody's calls unless it's going to mean extra money for me. And I've completely cut off all relationships with any friends that I had before the show. And I've copped an attitude.", "A positive attitude is something everyone can work on, and everyone can learn how to employ it.", "My feelings about my mortality are less selfish than they used to be. I used to affect a cavalier attitude to death now I see it from my son's perspective.", "The U.S. tries to provide immigrants who grow up here with a world-class education and imbue them with the can-do attitude that has long defined American innovation.", "The attitude of independence toward a constructed language which all national speakers must adopt is really a great advantage, because it tends to make man see himself as the master of language instead of its obedient servant.", "I feel like I have as good a shot as anybody out there and I have gotten close in the past, so why not have the attitude that I can come out and play great tennis and maybe even win this tournament.", "Art is the child of Nature yes, her darling child, in whom we trace the features of the mother's face, her aspect and her attitude.", "I just think that people take me a little more seriously as a brunette. I don't know if that's just because of a societal preconceived notion that all blondes are stupid, but it's a different kind of attitude.", "I came back to performing with a different attitude about performing and myself. I wasn't expecting perfection any more, just hoping for an occasional inspiration.", "The purely agitation attitude is not good enough for a detailed consideration of a subject.", "Animals have a much better attitude to life and death than we do. They know when their time has come. We are the ones that suffer when they pass, but it's a healing kind of grief that enables us to deal with other griefs that are not so easy to grab hold of.", "Only one thing can conquer war - that attitude of mind which can see nothing in war but destruction and annihilation.", "It's not too good to have this attitude in F1. It could be a disadvantage.", "I just really think every job I do, I get this gypsy attitude to money.", "My personal view is that such total planning by the state is an absolute good and not simply a relative good... I do not myself think of the attitude I take as deriving from Marx - though this undoubtedly will be suggested - but from Fichte and Hegel.", "There's a punk-rock attitude, clearly, to 'Hated.' There's even a punk-rock attitude to 'The Hangover,' I think. We start the movie with a Glenn Danzig song.", "The American attitude is 'We're the best'. That's why the NBA guys who come from other countries, the Europeans, all sort of stick together away from the game.", "The problem was just a mean attitude that festers and has to be challenged.", "I'm not anti-fashion, but I've always had a bit of a punk attitude. That's important, I think. I do my own thing.", "To so enter into it in nature and art that the enjoyed meanings of life may become a part of living is the attitude of aesthetic appreciation.", "The traditional Christian attitude toward human personality was that human nature was essentially good and that it was formed and modified by social pressures and training.", "My parents have a strong work ethic, but their attitude to life, their philosophy, is: 'whatever makes you happy.'", "Bob Altman had this relaxed but serious attitude. Everybody loved him. I wanted him to adopt me.", "The pool is terrible, but that doesn't have much to do with my record swims. That's all mental attitude.", "Fame can be just so annoying because people are so critical of you. You can't just say, 'hi'. You say hi and people whisper' man did you see the way she said hi? What an attitude.", "My dad instilled in me a great sense of humor. I wasn't bullied at school because my outward attitude was confident, and that helps.", "The attitude and capacity of the factory, the old metal table and the new ideas of the wooden furniture quickly and naturally suggested the possibility of metal furniture.", "You can measure a programmer's perspective by noting his attitude on the continuing vitality of FORTRAN.", "Let us change our traditional attitude to the construction of programs. Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do.", "It goes without saying that the Jewish people can have no other goal than Palestine and that, whatever the fate of the proposition may be, our attitude toward the land of our fathers is and shall remain unchangeable.", "That attitude toward women as objects may have worked for the late Sixties, but it doesn't do so now.", "The time I spent thinking about how I was better than somebody else or worrying about somebody else's attitude was time I could put to better use.", "I really believe you can predict when someone has a great attitude, a real well of talent.", "It is impossible to exaggerate the wide, and widening, gulf between the American attitude on the Iraq war and the view from our friends across the Atlantic.", "As a team, you need to come from behind every once in awhile just to do it. Good for the attitude. It makes it exciting. And when everybody knows you have to throw it... that makes it fun too.", "I hope 'The Voice' has a fifteen-year run, don't get me wrong. But I come from nothing, and maybe it's the Irish in me, but my attitude is always like, 'They'll figure me out soon.'", "Time plays a role in almost every decision. And some decisions define your attitude about time.", "'UFO's' attitude toward the subject is very similar to mine. It's not an advocacy its philosophy is more 'I want to believe this, but I want it proved.'", "The music is first and foremost everything - no egos, no attitude, nothing - it's about the music.", "But having said that, there's also a sea change in attitude towards media.", "In the West, you have always associated the Islamic faith 100 percent with Arab culture. This in itself is a fundamentalist attitude and it is mistaken.", "Jazz in itself is not struggling. That is, the music itself is not struggling... It's the attitude that's in trouble. My plays insist that we should not forget or toss away our history.", "As the time goes by, you change, your learn new things, your attitude is different. For the moment, I'm still enjoying ski racing so much that it would be difficult for me to think about ending my career.", "My attitude on skis is different now. I have learned to put less pressure on myself and on the edges of my skis when I'm racing, to be keep myself more under control.", "Our attitude is that we want to cross over. You can't go on making records just for your own hometown.", "I do not share the half-in, half-out attitude to the EU of some in Britain. Britain's place is in Europe.", "I think that the U.S. does have this very much more open attitude, and I admire it very much and I think it's very important to the world. But the information and the discussion sometimes come too late, after the effective decision has been made.", "The Stones are a different kind of group. I realized that when I joined them. It's not really so much their musical ability, it's just they have a certain kind of style and attitude which is unique.", "Even with, or perhaps, because of, this background, I have over the past few years sensed a very dramatic change in attitude on the part of Prince Edward Islanders towards the on-going rush for so-called modernization.", "If you're looking for can-do, earthy-crunchy attitude then you've got to go to Wisconsin.", "When I was in my 20s it did occur to me that there was something perverted about an attitude that thought that killing somebody was a minor offence compared to kissing somebody.", "You can have a laugh in Los Angeles, or you can weep in Los Angeles, depending on your attitude towards it.", "People are patronizing the theatres with renewed enthusiasm - there is an entire picnic-like attitude when families go out to see movies, which is a very good sign. They want to see larger-than-life characters on the big screen and not just watch movies on television or on DVDs.", "I just want to go in with the right attitude and from Day 1 make a difference.", "The theatre only knows what it's doing next week, not like the opera, where they say: What are we going to do in five years' time? A completely different attitude.", "I'm not a music lover in the sense that I look for something to have on. I've never had that attitude to music.", "I think one of the things that language poets are very involved with is getting away from conventional ideas of beauty, because those ideas contain a certain attitude toward women, certain attitudes toward sex, certain attitudes toward race, etc.", "When you Google me, you'll find a lot of people don't like Richard Dreyfuss. Because I'm cocky and I present a cocky attitude. But no one has ever disagreed with the notion I represent, that we need more civic education. So far there's 100 percent support for that.", "My mother, she had a very good attitude toward money. I'm very grateful for the fact that we had to learn to save. I used to get like 50 pence a week, and I'd save it for like five months. And then I'd spend it on Christmas presents. I'd save up like eight pounds. It's nothing, but we did that.", "Too many people say to their brokers, I can't deal with this. Take my money. Do what you want. That's the worst attitude you can have.", "If philosophy is practice, a demand to know the manner in which its history is to be studied is entailed: a theoretical attitude toward it becomes real only in the living appropriation of its contents from the texts.", "I am shocked by the easy attitude of many in the media towards disclosing our Nation's secrets.", "I always give Lindsay so much credit for her tennis game, for her attitude, for her person, and because of how she deals with all the things. I don't think people give her enough credit for how well she's doing.", "I don't know that I have any role models now that are fixed. Definitely my mom - she's the coolest. She's worked really hard her whole life and I just think she's got a great attitude. Moms just know so much it's so silly.", "It's tricky. I've never been standing at the top of the tree with tons of money thrown at me. I've never really had a profile. So in a way I have this 'nothing to lose' attitude.", "Lead singers not only do the majority of the work, but their personalities are singled out and taken as the general attitude of the unit.", "It's better for me to play with guys because Rock 'n' Roll has such an aggressive attitude.", "I think Nina Simone has had an amazing journey. She was spicy and she had attitude and she didn't care, she wanted her money in a paper bag and don't mess with me and I've been doing some research on that so.", "I kind of resent this attitude of men that we somehow must always look good.", "Bambi can't act. Bambi had major attitude.", "I'm a big fan of Courtney Love. I love Hole and I love her acting and I love her attitude. I just hope I never meet her in a dark alley.", "I do support a sex-positive attitude for young people. Use condoms, that's important. I love the idea that promiscuity can be healthy but it's got some dodgy crevasses. Ooh, that's a bad reference! But it's got some dangerous cavities there. You know what I'm saying.", "The war changed everybody's attitude. We became international almost overnight.", "As I wrote, I found that Aibileen had some things to say that really weren't in her character. She was older, soft-spoken, and she started showing some attitude.", "I like England more than I did when I left. It's become a bit of a better country in the last ten years, in the attitude of it. A bit more Americanized, which is both good and bad. At least when you order a cup of coffee they don't give you a hard time.", "What a stupid attitude we have in this country to personal stories.", "I have a Woody Allen Jewish attitude to life: that it's all going to be disastrous. That it hasn't all been that way is simply down to some random quirk of fate.", "My attitude toward graduate students was different, I must say. I used graduate students as colleagues: I gave them the best problems to work on, and I encouraged them.", "Tommie Aaron taught me how to have a good attitude, to be easy going and not get uptight.", "In aid, the proper attitude is one omitting gratitude.", "In Scotland over many years we have cultivated through our justice system what I hope can be described as a 'culture of compassion.' On the other hand, there still exists in many parts of the U.S., if not nationally, an attitude towards the concept of justice which can only be described as a 'culture of vengeance.'", "Any time I need to get a serious attitude adjustment, I put on one of their records, and there are examples there for all time to keep us honest and keep us reaching they'll never be eclipsed.", "I always had the attitude that I wanted to throw a no-hitter every game.", "I like actors that are good with pantomime and that can transmit a lot by their presence and attitude more than through their dialogue.", "Having a child makes you strong and gives you chutzpah. It relaxed my attitude to the job my center of focus shifted, which I think is very helpful, because even if you're not a very indulgent actor you spend a lot of time thinking about yourself. I don't think that is particularly healthy.", "I always said punk was an attitude. It was never about having a Mohican haircut or wearing a ripped T-shirt. It was all about destruction, and the creative potential within that.", "Sid Vicious began the age of participation in which everyone could be the artist. Sid proved that you don't have to play well to be the star. You can play badly, or not even at all. I endorsed that attitude. If you can't write songs, no problem - simply steal one and change it to your taste.", "Abhorrence of apartheid is a moral attitude, not a policy.", "Every baseball crowd, like every theatre audience, has its own distinctive attitude and atmosphere.", "Football is my profession now. I'm getting married in August... It's a new experience for me as someone just getting out of college. I still have the same attitude about football I always had. I play hard. I enjoy practice. I'd rather be throwing in passing drills than sitting around and watching TV.", "The attitude we have towards our personal pets as opposed to the animals that suffer under the factory farm is hypocritical and delusional.", "Certain kinds of speed, flow, intensity, density of attacks, density of interaction... Music that concentrates on those qualities is, I think, easier achieved by free improvisation between people sharing a common attitude, a common language.", "I saw 'Taxi Driver,' and 'Taxi Driver' kind of saved my life. The scene where Robert De Niro is looking at himself in the mirror saying, 'You talkin' to me? You talkin' to me? Who the hell else are you talkin' to?' That's the scene that changed my life by changing my attitude about acting.", "I've always been a guy who's pretty supportive, its just my nature, so I came in to the situation with the attitude that I wanted to support Johnny and make it work.", "I thought I was going to be killed. The casualties were so heavy, it was just a given. I learned to take each day, each mission, as it came. That's an attitude I've carried into my professional life. I take each case, each job, as it comes.", "What has happened is that to some degree they have taken an attitude where they don't listen to demos of diverse subject matters. They're looking for demos like the record the guy on the left just did.", "Here you do have forests, where pigs could be raised by letting them root about in the forests for a good part of the year. Therefore, you have a different attitude toward them compared with what continues to exist in the Middle East.", "The attitude of physiological psychology to sensations and feelings, considered as psychical elements, is, naturally, the attitude of psychology at large.", "This generation... they have a different attitude. Instead of sitting and watching something, they want to be a part of it - they're very hedonistic and sensual.", "We have become aware of the responsibility for our attitude towards the dark pages in our history. We have understood that bad service is done to the nation by those who are impelling to renounce that past.", "But I do think that we approach music, in of itself, with a religious attitude.", "I think that generally music should be a positive thing, I like Bob Marley's attitude: he said that his goal in life was to single handedly fight all the evil in the world with nothing but music, and when he went to a place he didn't go to play, he went to conquer.", "In 1977, at least, he wished to have people believe that he shared and was proud of an attitude toward women that is not acceptable in a politician. In 2003, all he has said is that he doesn't remember the interview.", "You'd like more people to recognise what you do is special. But I take the attitude that the best thing I can do for my sport is to be the best at it. The best way people will come to recognise that track and field is a great sport is to see athletes excelling at it. Which is what I intend to do.", "So at a time in which the media give the public everything it wants and desires, maybe art should adopt a much more aggressive attitude towards the public. I myself am very much inclined to take this position.", "Modern Orthodoxy has a highly positive attitude toward the State of Israel. Our Ultra-Orthodox brethren recognize only the Holy Land, but not the state.", "I just try to try to keep an attitude that I don't know what I'm doing. Not to the point where I'm beating myself up, but I just go in thinking that I have a lot to learn. And I hope I still have that attitude 30 years from now.", "I'm not going to take this defeatist attitude and listen to all this crap any more from all these people who have nothing except doomsday to predict.", "A series of rumors about my attitude, as well as derogatory remarks about myself and my family showed me that the personal resentment of the Detroit general manager toward me would make it impossible for me to continue playing hockey in Detroit.", "Before 'Gangnam Style' I was not a good attitude artist.", "Women didn't want to be on the stage with other women because they didn't want their bodies to be compared. They didn't want another female act opening for them because of this weird competitive and tokenistic attitude.", "Listen, whatever makes the movie better. That's the attitude you have to have.", "Reason is an action of the mind knowledge is a possession of the mind but faith is an attitude of the person. It means you are prepared to stake yourself on something being so.", "Hardboiled crime fiction came of age in 'Black Mask' magazine during the Twenties and Thirties. Writers like Dashiell Hammett and Raymond Chandler learnt their craft and developed a distinct literary style and attitude toward the modern world.", "I don't think people are fools, and I think they deserve a good attitude and smart entertainment.", "Hollywood's a very weird place. I think there's less of everything except for attitude.", "My agent says that I'm a 'repeat business guy.' If you hire me to come do a movie, I'll be on time, know all my material, be ready to go, have a good attitude. I'm here to work, so I get hired over and over again by the same producers. If you just be a team player on set you can work so much more often.", "What do you mean by faith? Is faith enough for Man? Should he be satisfied with faith alone? Is there no way of finding out the truth? Is the attitude of faith, of believing in something for which there can be no more than philosophic proof, the true mark of a Christian?", "I still have a young attitude.", "Elvis Costello had a brand new bag. He was a musician, but he knew all about the attitude part of it.", "The world is full of musicians who can play great, and you wouldn't cross the road to see them. It's people who have this indefinable attitude that are the good ones.", "After working for years in Hollywood where the actors have taken over, it was a real relief to get down there and not only have some children, but also have some actors that had no attitude.", "When you are facing the wilderness on your own, you have a totally different attitude to someone who works in government or who has a monthly cheque.", "If you take the contempt some Americans have for yuppies and multiply it by 10 you might come close to understanding their attitude towards the City, as they call it - London, the people of the south.", "If you go on stage with the wrong attitude, or something in your performance is off, you can lose an audience in the first minute. That first minute is crucial.", "We can do better in higher education. And it is more than just technology. It's also an attitude on the part of faculty. We need to think through how we can produce a better quality product at less cost.", "In terms of work I've always had a Bad Attitude in that I won't work anywhere which requires me to work strict hours or follow a dress code. I don't know if that's an Asperger's thing or not, I think it's just being reasonable."];
function oo(e2) {
  return n(io, e2);
}
var no = ["Satin", "Giant Angora", "Tan", "Havana", "Harlequin", "Rhinelander", "Cinnamon", "American", "Florida White", "Checkered Giant", "English Lop", "Polish", "English Angora", "Belgian Hare", "Standard Chinchilla", "Giant Chinchilla", "English Spot", "Dutch"];
function ro(e2) {
  return n(no, e2);
}
function so(e2) {
  const a = e2?.days ?? 1;
  if (a < 1)
    throw new Error("days must be positive, use soon() instead");
  const t2 = 24 * a * 60 * 60 * 1e3, i2 = /* @__PURE__ */ new Date(), o2 = new Date(i2.getTime() - t2);
  return n(() => Q({ from: o2, to: i2 }), e2);
}
var lo = [{ width: "1024", height: "768" }, { width: "2048", height: "1536" }, { width: "1280", height: "800" }, { width: "1920", height: "1080" }, { width: "2560", height: "1440" }, { width: "3840", height: "2160" }, { width: "320", height: "480" }, { width: "750", height: "1334" }, { width: "1080", height: "1920" }, { width: "1280", height: "720" }, { width: "1920", height: "1080" }, { width: "3840", height: "2160" }, { width: "2732", height: "2048" }, { width: "2160", height: "1620" }, { width: "2560", height: "1600" }, { width: "3440", height: "1440" }, { width: "5120", height: "2880" }, { width: "3840", height: "1600" }, { width: "2560", height: "1080" }, { width: "4096", height: "2160" }, { width: "3840", height: "1080" }, { width: "2960", height: "1440" }, { width: "3120", height: "1440" }, { width: "2560", height: "1312" }, { width: "3840", height: "1200" }, { width: "3840", height: "2160" }, { width: "7680", height: "4320" }, { width: "5120", height: "2160" }];
function uo(e2) {
  return n(lo, e2);
}
function co(e2) {
  return n(() => {
    const [a, t2, i2, o2] = [s({ min: 0, max: 255 }), s({ min: 0, max: 255 }), s({ min: 0, max: 255 }), Ra({ min: 0.1, max: 1 })];
    return e2?.alpha ? `rgba(${a}, ${t2}, ${i2}, ${o2})` : `rgb(${a}, ${t2}, ${i2})`;
  }, e2);
}
var ho = ["Admin", "Editor", "Owner", "Contributor", "Viewer", "Developer"];
function mo(e2) {
  return n(ho, e2);
}
function po(e2) {
  return n(() => k({ min: 1e7, max: 99999999 }), e2);
}
function yo(e2) {
  return n(() => {
    const a = Array.from({ length: 3 }, () => k({ min: 0, max: 20 })).join(".");
    return `${e2?.prefix || ""}${a}`;
  }, e2);
}
var go = ["Triangle", "Circle", "Square", "Rectangle", "Parallelogram", "Rhombus", "Trapezium", "Kite", "Polygons", "Sphere", "Cube", "Cuboid", "Cone", "Cylinder"];
function fo(e2) {
  return n(go, e2);
}
var bo = ["Accounting or bookkeeping", "Active listening", "Adaptability", "Analytical and problem solving", "Attention to detail", "Brand development", "Collaboration", "Communication", "Creativity", "Critical thinking", "Customer service", "Data analysis", "Data mining", "Data privacy", "Decision making", "Dependability", "Diplomacy", "Empathy", "Enterprise resource planning", "Human resources", "Leadership", "Microsoft office proficiency", "Multilingualism", "Multitasking", "Negotiation", "Organization", "Patience", "Positivity", "Problem solving", "Process automation", "Product design", "Project management", "Research skills", "Search engine optimization", "Self-motivation", "Social skills", "Software proficiency", "Storytelling", "Teamwork", "Time management", "Troubleshooting", "Typing skills", "Verbal and presentation", "Work ethic", "Writing and editing"];
function wo(e2) {
  return n(bo, e2);
}
function vo(e2) {
  return n(() => ha({ length: s({ min: 3, max: 10 }) }).join("-"), e2);
}
var ko = ["Bluntnose viper", "Yunnan keelback", "Eastern hognose snake", "Southwestern black spitting cobra", "Machete savane", "Angolan python", "Huttons tree viper", "Eastern tiger snake", "Central ranges taipan", "Schultzes pitviper", "Mexican west coast rattlesnake", "Indigo snake", "Dog-toothed cat snake", "Bismarck ringed python", "Boomslang", "Mangshan pitviper", "Whip snake", "Mountain adder"];
function So(e2) {
  return n(ko, e2);
}
var Co = [{ name: "Triller", link: "https://www.triller.co/" }, { name: "Periscope", link: "https://www.periscope.tv/" }, { name: "Vimeo", link: "https://vimeo.com/" }, { name: "Valence", link: "https://valence.community/" }, { name: "Untappd", link: "https://untappd.com/" }, { name: "Elpha", link: "https://elpha.com/" }, { name: "Yubo", link: "https://yubo.live/" }, { name: "Peanut", link: "https://www.peanut-app.io/" }, { name: "Houseparty", link: "https://houseparty.com/" }, { name: "Caffeine", link: "https://www.caffeine.tv/" }, { name: "Steemit", link: "https://steemit.com/" }, { name: "Baidu Tieba", link: "https://tieba.baidu.com/" }, { name: "23snaps", link: "https://www.23snaps.com/" }, { name: "Likee", link: "https://likee.video/" }, { name: "8tracks", link: "https://8tracks.com/" }, { name: "Academia", link: "https://www.academia.edu/" }, { name: "Amikumu", link: "https://amikumu.com/" }, { name: "aNobii", link: "https://www.anobii.com/" }, { name: "ASMALLWORLD", link: "https://www.asmallworld.com/" }, { name: "Athlinks", link: "https://www.athlinks.com/" }, { name: "BAND", link: "https://band.us/en" }, { name: "beBee", link: "https://www.bebee.com/us/" }, { name: "blind", link: "https://www.teamblind.com/" }, { name: "diaspora*", link: "https://diasporafoundation.org/" }, { name: "Fark", link: "https://www.fark.com/" }, { name: "MeWe", link: "https://mewe.com/" }, { name: "Facebook", link: "https://www.facebook.com/" }, { name: "Instagram", link: "https://www.instagram.com/" }, { name: "Twitter", link: "https://twitter.com/" }, { name: "Tumblr", link: "https://www.tumblr.com/" }, { name: "LinkedIn", link: "https://www.linkedin.com/" }, { name: "WhatsApp", link: "https://www.whatsapp.com/" }, { name: "Snapchat", link: "https://www.snapchat.com/" }, { name: "Pinterest", link: "https://www.pinterest.com/" }, { name: "Reddit", link: "https://www.reddit.com/" }, { name: "YouTube", link: "https://www.youtube.com/" }, { name: "Mix", link: "https://mix.com/" }, { name: "Tagged", link: "https://www.tagged.com/" }, { name: "Nextdoor", link: "https://nextdoor.com/" }, { name: "DeviantArt", link: "https://www.deviantart.com/" }, { name: "Quora", link: "https://www.quora.com/" }, { name: "Meetup", link: "https://www.meetup.com/" }, { name: "ReverbNation", link: "https://www.reverbnation.com/" }, { name: "Flixster", link: "https://www.flixster.com/" }, { name: "Goodreads", link: "https://www.goodreads.com/" }, { name: "Twitch", link: "https://www.twitch.tv/" }, { name: "CaringBridge", link: "https://www.caringbridge.org/" }, { name: "Wattpad", link: "https://www.wattpad.com/" }, { name: "Viadeo", link: "http://www.viadeo.com/" }, { name: "Crunchyroll", link: "https://www.crunchyroll.com/" }, { name: "Skyrock", link: "https://www.skyrock.com/" }, { name: "VK", link: "https://vk.com/" }, { name: "MyHeritage", link: "https://www.myheritage.com/" }, { name: "LiveJournal", link: "https://www.livejournal.com/" }, { name: "Classmates", link: "https://www.classmates.com/" }, { name: "SoundCloud", link: "https://soundcloud.com/" }, { name: "Bubbly", link: "http://bubbly.net/" }, { name: "Flickr", link: "https://www.flickr.com/" }, { name: "We Heart It", link: "https://weheartit.com/" }, { name: "Influenster", link: "https://www.influenster.com/" }, { name: "FilmAffinity", link: "https://www.filmaffinity.com/en/main.html" }, { name: "Open Diary", link: "https://www.opendiary.com/" }, { name: "Yelp", link: "https://www.yelp.com/" }, { name: "CollegeHumor", link: "http://www.collegehumor.com/" }, { name: "Gaia Online", link: "https://www.gaiaonline.com/" }, { name: "MocoSpace", link: "https://www.mocospace.com/" }, { name: "CouchSurfing", link: "https://www.couchsurfing.com/" }, { name: "Funny or Die", link: "https://www.funnyordie.com/" }, { name: "italki", link: "https://www.italki.com/home" }, { name: "eToro", link: "https://www.etoro.com/" }, { name: "XING", link: "https://www.xing.com/en" }, { name: "MeetMe", link: "https://www.meetme.com/" }, { name: "Ravelry", link: "https://www.ravelry.com/account/login" }, { name: "Care2", link: "https://www.care2.com/" }, { name: "YY", link: "http://www.yy.com/" }, { name: "Vero", link: "https://www.vero.co/" }, { name: "Medium", link: "https://medium.com/" }, { name: "GIPHY", link: "https://giphy.com/" }, { name: "Tribe", link: "https://tribe.so/" }, { name: "Tencent QQ", link: "https://www.qq.com/" }, { name: "WeChat", link: "https://www.wechat.com/en" }, { name: "Qzone", link: "https://qzone.qq.com/" }, { name: "TikTok", link: "https://www.tiktok.com/trending?lang=en" }, { name: "Sina Weibo", link: "https://www.weibo.com/overseas" }, { name: "Kuaishou", link: "https://www.kuaishou.com/" }, { name: "Skype", link: "https://www.skype.com/en/" }, { name: "Viber", link: "https://www.viber.com/en/" }, { name: "LINE", link: "https://line.me/en/" }, { name: "LINE PLAY", link: "http://lp.play.line.me/en.html" }, { name: "The Dots", link: "https://the-dots.com/" }, { name: "Telegram", link: "https://telegram.org/" }, { name: "Foursquare Swarm", link: "https://www.swarmapp.com/" }, { name: "Douban", link: "https://www.douban.com/" }, { name: "Discord", link: "https://discord.com/" }, { name: "Badoo", link: "https://badoo.com/" }, { name: "Myspace", link: "https://myspace.com/" }, { name: "Mixi", link: "https://mixi.jp/" }, { name: "Ravelry", link: "https://www.ravelry.com/account/login" }, { name: "Cellufun", link: "http://www.cellufun.com/games.asp?v=59bfuWxNv00" }, { name: "Xanga", link: "http://xanga.com/" }, { name: "Imgur", link: "https://imgur.com/" }, { name: "Ello", link: "https://ello.co/" }];
function Ao(e2) {
  return n(Co, e2);
}
function Mo(e2) {
  const a = e2?.days ?? 1;
  if (a < 1)
    throw new Error("days must be positive, use recent() instead");
  const t2 = 24 * a * 60 * 60 * 1e3, i2 = /* @__PURE__ */ new Date(), o2 = new Date(i2.getTime() + t2);
  return n(() => Q({ from: i2, to: o2 }), e2);
}
var To = { olympic: ["Archery", "Artistic Gymnastics", "Artistic Swimming", "Athletics", "Badminton", "Baseball Softball", "Basketball", "Beach Volleyball", "BMX Freestyle", "BMX Racing", "Boxing", "Kayak Flatwater", "Kayak Slalom", "Diving", "Equestrian", "Fencing", "Football", "Golf", "Handball", "Hockey", "Judo", "Karate", "Marathon Swimming", "Modern Pentathlon", "Mountain Bike", "Rhythmic Gymnastics", "Road Cycling", "Rowing", "Rugby", "Sailing", "Shooting", "Skateboarding", "Sport Climbing", "Surfing", "Swimming", "Table Tennis", "Taekwondo", "Tennis", "Track Cycling", "Trampoline", "Triathlon", "Volleyball", "Water Polo", "Weightlifting", "Wrestling"], winterOlympic: ["Alpine Skiing", "Biathlon", "Bobsleigh", "Cross-Country Skiing", "Curling", "Figure Skating", "Freestyle Skiing", "Ice Hockey", "Luge", "Nordic Combined", "Short Track Speed Skating", "Skeleton", "Ski Jumping", "Snowboard", "Speed Skating"], outdoor: ["Archery", "Athletics", "Badminton", "Baseball", "Basketball", "Bowling", "Boxing", "Camping", "Canoeing", "Climbing", "Cricket", "Curling", "Cycling", "Equestrian", "Fencing", "Football", "Golf", "Gymnastics", "Handball", "Hang Gliding", "High Jumping", "Hockey", "Ice Hockey", "Judo", "Karate", "Kite Flying", "Monkey Bars", "Motorsports", "Netball", "Rowing", "Rugby", "Running", "Sailing", "Skateboarding", "Slide", "Snow Skiing", "Soccer", "Street Hockey", "Surfing", "Swimming", "Table Tennis", "Tennis", "Trekking", "Triathlon", "Volleyball", "Weightlifting", "Wrestling"] };
function Bo(e2) {
  const a = e2?.category ?? wa(["olympic", "outdoor", "winterOlympic"]);
  return n(() => r(To[a]), e2);
}
function Io(e2) {
  return n(() => r([A, V, j, Ja, ft])(), e2);
}
var Po = ["Oklahoma", "South Dakota", "Massachusetts", "Minnesota", "Rhode Island", "Florida", "Delaware", "Utah", "Maryland", "Pennsylvania", "West Virginia", "Nevada", "New York", "Alabama", "Arizona", "Wyoming", "Washington", "Nebraska", "Mississippi", "Missouri", "Arkansas", "Vermont", "North Dakota", "Iowa", "Georgia", "Kentucky", "Wisconsin", "New Hampshire", "Hawaii", "Idaho", "Michigan", "Ohio", "Colorado", "Kansas", "Maine", "Alaska", "Indiana", "South Carolina", "Oregon", "Illinois", "Tennessee", "California", "Virginia", "Texas", "Montana", "New Jersey", "North Carolina"];
function xo(e2) {
  return n(Po, e2);
}
var Do = ["OR", "FL", "NM", "AK", "MO", "NE", "RI", "MI", "PA", "WI", "AL", "MA", "MN", "TN", "ND", "MS", "AR", "HI", "UT", "ID", "SC", "CA", "NJ", "CT", "OK", "AZ", "IA", "SD", "MT", "MD", "WY", "KS", "WV", "CO", "TX", "VT", "NV", "DE", "ME", "GA", "LA", "IN", "VA"];
function Go(e2) {
  return n(Do, e2);
}
var Fo = [{ status: "Pending", type: ["Project", "User Story"] }, { status: "Todo", type: ["User Story", "Task"] }, { status: "In progress", type: ["Task"] }, { status: "In Discussion", type: ["User Story"] }, { status: "In Development", type: ["User Story", "Task"] }, { status: "Needs Confirmation", type: ["User Story"] }, { status: "Completed", type: ["User Story", "Task", "Project"] }, { status: "Upcoming", type: ["Project"] }, { status: "Overdue", type: ["Project"] }, { status: "Not started", type: ["Project"] }, { status: "Active", type: ["Project"] }, { status: "Priority", type: ["Project"] }, { status: "Canceled", type: ["Project"] }, { status: "Closed", type: ["Project", "Task"] }, { status: "New", type: ["Project", "Task", "User Story"] }, { status: "On hold", type: ["Project"] }];
function qo(e2) {
  return n((e2?.type ? Fo.filter((a) => a.type.includes(e2.type)) : Fo).map(({ status: e3 }) => e3).flat(), e2);
}
var Lo = ["Basic", "Premium", "Free", "Gold", "Unlimited", "Starter", "Business", "Professional", "Advanced", "Silver", "Bronze", "Standard", "Pro", "Enterprise", "Platinum"];
function Ro(e2) {
  return n(Lo, e2);
}
var Eo = [{ realName: "Peter Parker", alterEgo: "Spider-man", company: "Marvel" }, { realName: "Matt Murdock", alterEgo: "Daredevil", company: "Marvel" }, { realName: "T'Challa", alterEgo: "Black Panther", company: "Marvel" }, { realName: "Steve Rogers", alterEgo: "Captain America", company: "Marvel" }, { realName: "Thor Odinson", alterEgo: "Thor", company: "Marvel" }, { realName: "Remy Etienne LeBeau", alterEgo: "Gambit", company: "Marvel" }, { realName: 'James "Logan" Howlett', alterEgo: "Wolverine", company: "Marvel" }, { realName: "Frank Castle", alterEgo: "Punisher", company: "Marvel" }, { realName: "Dr. Stephen Strange", alterEgo: "Doctor Strange", company: "Marvel" }, { realName: "Tony Stark", alterEgo: "Iron Man", company: "Marvel" }, { realName: "Wade Wilson", alterEgo: "Deadpool", company: "Marvel" }, { realName: "Steven Grant", alterEgo: "Moon Knight", company: "Marvel" }, { realName: "Frog Thor", alterEgo: "Frog Thor", company: "Marvel" }, { realName: "Doug Ramsey", alterEgo: "Cypher", company: "Marvel" }, { realName: "Natasha Alianovna Romanova", alterEgo: "Black Widow", company: "Marvel" }, { realName: "Ms. Marvel", alterEgo: "Carol Danvers", company: "Marvel" }, { realName: "Shadowcat", alterEgo: "Kitty Pryde", company: "Marvel" }, { realName: "Susan Storm", alterEgo: "Invisible Woman", company: "Marvel" }, { realName: "Elektra Natchios", alterEgo: "Elektra", company: "Marvel" }, { realName: "Janet Van Dyne", alterEgo: "Wasp", company: "Marvel" }, { realName: "Clarice Ferguson", alterEgo: "Blink", company: "Marvel" }, { realName: "Ororo Munroe", alterEgo: "Storm", company: "Marvel" }, { realName: "Wanda Maximoff", alterEgo: "Scarlet Witch", company: "Marvel" }, { realName: "Anna Marie LeBeau", alterEgo: "Rogue", company: "Marvel" }, { realName: "Jennifer Walter", alterEgo: "She-Hulk", company: "Marvel" }, { realName: "Silvija Sablinova", alterEgo: "Silver Sable", company: "Marvel" }, { realName: "Gamora Zen Whoberi Ben Titan", alterEgo: "Gamora", company: "Marvel" }, { realName: "Jessica Drew", alterEgo: "X-23", company: "Marvel" }, { realName: "Bruce Wayne", alterEgo: "Batman", company: "DC" }, { realName: "Clark Kent", alterEgo: "Superman", company: "DC" }, { realName: "Hal Jordan", alterEgo: "Green Lantern", company: "DC" }, { realName: "Barry Allen", alterEgo: "The Flash", company: "DC" }, { realName: "J'onn J'onzz", alterEgo: "Martian Manhunter", company: "DC" }, { realName: "Arthur Curry", alterEgo: "Aquaman", company: "DC" }, { realName: "Oliver Queen", alterEgo: "Green Arrow", company: "DC" }, { realName: "Ryan Choi", alterEgo: "The Atom", company: "DC" }, { realName: "Carter Hall", alterEgo: "Hawkman", company: "DC" }, { realName: "Nathaniel Adam", alterEgo: "Captain Atom", company: "DC" }, { realName: "Jefferson Michael Pierce", alterEgo: "Black Lightning", company: "DC" }, { realName: "Diana Prince", alterEgo: "Wonder Woman", company: "DC" }, { realName: "Chay-Ara", alterEgo: "Hawkgirl", company: "DC" }, { realName: "Tora Olafsdotter", alterEgo: "Ice", company: "DC" }, { realName: "Kara Zor-El", alterEgo: "Supergirl", company: "DC" }, { realName: "Jennifer-Lynn Hayden", alterEgo: "Jade", company: "DC" }, { realName: "Kara Zor-L", alterEgo: "Power Girl", company: "DC" }, { realName: "Dawn Granger", alterEgo: "Hawk", company: "DC" }, { realName: "Dinah Lance", alterEgo: "Black Canary", company: "DC" }, { realName: "Helena Bertinelli", alterEgo: "Huntress", company: "DC" }, { realName: "Barbara Gordon", alterEgo: "Batgirl", company: "DC" }, { realName: "Zinda Blake", alterEgo: "Lady Blackhawk", company: "DC" }];
function Ho(e2) {
  const a = e2?.company ? Eo.filter(({ company: a2 }) => a2 === e2.company) : Eo;
  return n(() => __spreadProps(__spreadValues({}, r(a)), { id: Bi() }), e2);
}
function Wo(e2) {
  const a = e2?.company ? Eo.filter(({ company: a2 }) => a2 === e2.company) : Eo;
  return n(() => r(a).alterEgo, e2);
}
var No = ['<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M28,14H14c-1.1,0-2-0.9-2-2s0.9-2,2-2h1h13c0.6,0,1-0.4,1-1s-0.4-1-1-1H15h-1H7C5.9,8,5,7.1,5,6s0.9-2,2-2h14c0.6,0,1-0.4,1-1s-0.4-1-1-1H7C4.8,2,3,3.8,3,6v15c0,2.2,1.8,4,4,4h3v2c0,2.2,1.8,4,4,4h14c0.6,0,1-0.4,1-1V15C29,14.4,28.6,14,28,14z"/><path d="M28,11H14c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S28.6,11,28,11z"/><path d="M21,5H7C6.4,5,6,5.4,6,6s0.4,1,1,1h14c0.6,0,1-0.4,1-1S21.6,5,21,5z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M31,25H10.5C8,25,6,23,6,20.5S8,16,10.5,16H31c0.6,0,1,0.4,1,1s-0.4,1-1,1H10.5C9.1,18,8,19.1,8,20.5S9.1,23,10.5,23H31 c0.6,0,1,0.4,1,1S31.6,25,31,25z"/></g><g><path d="M30,25c-0.3,0-0.7-0.2-0.9-0.5c-1.4-2.5-1.4-5.5,0-8c0.3-0.5,0.9-0.6,1.4-0.4c0.5,0.3,0.6,0.9,0.4,1.4c-1.1,1.9-1.1,4.1,0,6c0.3,0.5,0.1,1.1-0.4,1.4C30.3,25,30.2,25,30,25z"/></g><g><path d="M25,32H4.5C2,32,0,30,0,27.5S2,23,4.5,23H25c0.6,0,1,0.4,1,1s-0.4,1-1,1H4.5C3.1,25,2,26.1,2,27.5S3.1,30,4.5,30H25 c0.6,0,1,0.4,1,1S25.6,32,25,32z"/></g><g><path d="M24,32c-0.3,0-0.7-0.2-0.9-0.5c-1.4-2.5-1.4-5.5,0-8c0.3-0.5,0.9-0.6,1.4-0.4c0.5,0.3,0.6,0.9,0.4,1.4c-1.1,1.9-1.1,4.1,0,6c0.3,0.5,0.1,1.1-0.4,1.4C24.3,32,24.2,32,24,32z"/></g><g><path d="M16.9,5c-0.6,0-1-0.4-1-1c0-0.7-0.6-1.5-1.5-2l-0.2-0.1c-0.5-0.3-0.7-0.9-0.4-1.3c0.3-0.5,0.9-0.7,1.3-0.4l0.2,0.1c1.6,0.9,2.6,2.3,2.6,3.8C17.9,4.6,17.5,5,16.9,5z"/></g><path d="M21.5,3.1L21.5,3.1c-1.2-0.2-2.4,0.1-3.4,0.7c-0.3,0.2-0.8,0.2-1.1,0c-0.3-0.2-0.7-0.4-1.1-0.5c0,0.2,0.1,0.5,0.1,0.7c0,0.6-0.4,1-1,1s-1-0.4-1-1c0-0.3-0.1-0.6-0.3-0.9c0,0-0.1,0-0.1,0c-2.9,0.5-4.9,3.5-4.5,6.7c0.3,2.3,1.9,5.8,3.9,7.3c0.7,0.5,1.4,0.8,2,0.8c0.1,0,0.3,0,0.4,0c0.5-0.1,0.9-0.3,1.3-0.6c0.4-0.3,1.1-0.3,1.5,0c0.4,0.3,0.9,0.5,1.3,0.6c0.8,0.1,1.6-0.1,2.5-0.7c2-1.5,3.6-5,3.9-7.3C26.3,6.6,24.3,3.5,21.5,3.1z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M14,24c0-5.5,4.5-10,10-10c1,0,2.1,0.2,3,0.5V9c0-0.6-0.4-1-1-1H11H9C7.9,8,7,7.1,7,6s0.9-2,2-2h17c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C6.8,2,5,3.8,5,6v20c0,2.2,1.8,4,4,4h2h5C14.8,28.3,14,26.3,14,24z"/><path d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27,25h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S27.6,25,27,25z"/><g><path d="M26,7H9C8.4,7,8,6.6,8,6s0.4-1,1-1h17c0.6,0,1,0.4,1,1S26.6,7,26,7z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M18.3,18.3c-3.1,3.1-3.1,8.2,0,11.3s8.2,3.1,11.3,0s3.1-8.2,0-11.3S21.5,15.2,18.3,18.3z M26.8,22.6L25.4,24l1.4,1.4c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L24,25.4l-1.4,1.4c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l1.4-1.4l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l1.4,1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0C27.2,21.6,27.2,22.2,26.8,22.6z"/><path d="M14,24c0-5.5,4.5-10,10-10c1,0,2.1,0.2,3,0.5V9c0-0.6-0.4-1-1-1H11H9C7.9,8,7,7.1,7,6s0.9-2,2-2h17c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C6.8,2,5,3.8,5,6v20c0,2.2,1.8,4,4,4h2h5C14.8,28.3,14,26.3,14,24z"/><g><path d="M26,7H9C8.4,7,8,6.6,8,6s0.4-1,1-1h17c0.6,0,1,0.4,1,1S26.6,7,26,7z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M20,24c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S22.8,24,20,24z"/></g><path d="M29,5H3C2.4,5,2,5.4,2,6v20c0,0.6,0.4,1,1,1h11v-4.4c-0.6-1.1-1-2.3-1-3.6c0-3.9,3.1-7,7-7s7,3.1,7,7c0,1.3-0.4,2.5-1,3.6V27h3c0.6,0,1-0.4,1-1V6C30,5.4,29.6,5,29,5z M10,16H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h4c0.6,0,1,0.4,1,1S10.6,16,10,16z M13,12H6c-0.6,0-1-0.4-1-1s0.4-1,1-1h7c0.6,0,1,0.4,1,1S13.6,12,13,12z"/><path d="M20,26c-1.5,0-2.9-0.5-4-1.3V31c0,0.3,0.2,0.6,0.4,0.8c0.3,0.2,0.6,0.2,0.9,0.1l2.7-0.9l2.7,0.9c0.1,0,0.2,0.1,0.3,0.1c0.2,0,0.4-0.1,0.6-0.2c0.3-0.2,0.4-0.5,0.4-0.8v-6.3C22.9,25.5,21.5,26,20,26z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M26,7H9C8.4,7,8,6.6,8,6s0.4-1,1-1h17c0.6,0,1,0.4,1,1S26.6,7,26,7z"/></g><path d="M26,8H11H9C7.9,8,7,7.1,7,6s0.9-2,2-2h17c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C6.8,2,5,3.8,5,6v20c0,2.2,1.8,4,4,4h2h15c0.6,0,1-0.4,1-1V9C27,8.4,26.6,8,26,8z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M24,16c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,16,24,16z M27,25h-2v2c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2h2c0.6,0,1,0.4,1,1S27.6,25,27,25z"/><path d="M14,24c0-5.5,4.5-10,10-10c1,0,2.1,0.2,3,0.5V9c0-0.6-0.4-1-1-1H11H9C7.9,8,7,7.1,7,6s0.9-2,2-2h17c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C6.8,2,5,3.8,5,6v20c0,2.2,1.8,4,4,4h2h5C14.8,28.3,14,26.3,14,24z"/><g><path d="M26,7H9C8.4,7,8,6.6,8,6s0.4-1,1-1h17c0.6,0,1,0.4,1,1S26.6,7,26,7z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M14,24c0-5.5,4.5-10,10-10c1,0,2.1,0.2,3,0.5V9c0-0.6-0.4-1-1-1H11H9C7.9,8,7,7.1,7,6s0.9-2,2-2h17c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C6.8,2,5,3.8,5,6v20c0,2.2,1.8,4,4,4h2h5C14.8,28.3,14,26.3,14,24z"/><g><path d="M26,7H9C8.4,7,8,6.6,8,6s0.4-1,1-1h17c0.6,0,1,0.4,1,1S26.6,7,26,7z"/></g><path d="M31.7,21.9c-0.1-0.5-0.7-0.8-1.2-0.7c-0.7,0.2-1.2,0-1.3-0.2c-0.1-0.2,0-0.7,0.5-1.3c0.4-0.4,0.4-1,0-1.4c-1-1-2.2-1.7-3.6-2.1c-0.5-0.1-1.1,0.2-1.2,0.7c-0.2,0.7-0.6,1-0.9,1s-0.6-0.4-0.9-1c-0.2-0.5-0.7-0.8-1.2-0.7c-1.4,0.4-2.6,1.1-3.6,2.1c-0.4,0.4-0.4,1,0,1.4c0.5,0.5,0.6,1,0.5,1.3c-0.1,0.2-0.6,0.4-1.3,0.2c-0.5-0.1-1.1,0.2-1.2,0.7C16.1,22.6,16,23.3,16,24s0.1,1.4,0.3,2.1c0.1,0.5,0.7,0.8,1.2,0.7c0.7-0.2,1.2,0,1.3,0.2c0.1,0.2,0,0.7-0.5,1.3c-0.4,0.4-0.4,1,0,1.4c1,1,2.2,1.7,3.6,2.1c0.5,0.1,1.1-0.2,1.2-0.7c0.2-0.7,0.6-1,0.9-1s0.6,0.4,0.9,1c0.1,0.4,0.5,0.7,1,0.7c0.1,0,0.2,0,0.3,0c1.4-0.4,2.6-1.1,3.6-2.1c0.4-0.4,0.4-1,0-1.4c-0.5-0.5-0.6-1-0.5-1.3c0.1-0.2,0.6-0.4,1.3-0.2c0.5,0.1,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.4,0.3-2.1S31.9,22.6,31.7,21.9z M24,27c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S25.7,27,24,27z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><polygon points="7.1,23 8.9,23 8,21.2"/><path d="M13,16H3c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V18C15,16.9,14.1,16,13,16z M12.4,27.9C12.3,28,12.2,28,12,28c-0.4,0-0.7-0.2-0.9-0.6L9.9,25H6.1l-1.2,2.4c-0.2,0.5-0.8,0.7-1.3,0.4c-0.5-0.2-0.7-0.8-0.4-1.3l4-8c0.3-0.7,1.5-0.7,1.8,0l4,8C13.1,27,12.9,27.6,12.4,27.9z"/></g><path d="M17,1H7C5.9,1,5,1.9,5,3v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V3C19,1.9,18.1,1,17,1z M12,11c0.9,0,1.7-0.4,2.2-1c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4c-1,1.1-2.3,1.7-3.8,1.7c-2.8,0-5-2.2-5-5s2.2-5,5-5c1.4,0,2.8,0.6,3.8,1.7c0.4,0.4,0.3,1-0.1,1.4c-0.4,0.4-1,0.3-1.4-0.1c-0.6-0.7-1.4-1-2.2-1c-1.7,0-3,1.3-3,3S10.3,11,12,11z"/><g><path d="M24,24h-3v2h3c0.6,0,1-0.4,1-1S24.6,24,24,24z"/><path d="M25,21c0-0.6-0.4-1-1-1h-3v2h3C24.6,22,25,21.6,25,21z"/><path d="M28,16H18c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V18C30,16.9,29.1,16,28,16z M27,25c0,1.7-1.3,3-3,3h-4c-0.6,0-1-0.4-1-1v-4v-4c0-0.6,0.4-1,1-1h4c1.7,0,3,1.3,3,3c0,0.8-0.3,1.5-0.8,2C26.7,23.5,27,24.2,27,25z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M28.9,9.4C28.9,9.4,28.9,9.4,28.9,9.4C28.9,9.3,29,9.2,29,9.1c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0-0.1,0-0.2,0-0.3c0,0,0,0,0-0.1c0-0.1-0.1-0.2-0.1-0.3c0,0,0,0,0,0c-0.1-0.1-0.1-0.1-0.2-0.2l-11-7c-0.3-0.2-0.8-0.2-1.1,0l-13,9c0,0-0.1,0.1-0.1,0.1c0,0,0,0-0.1,0c-0.1,0.1-0.1,0.2-0.2,0.3c0,0,0,0,0,0.1C3,10.8,3,10.9,3,11c0,0,0,0,0,0v6v6c0,0.3,0.2,0.7,0.5,0.8l11,7c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2l13-9c0.2-0.2,0.4-0.4,0.4-0.7s-0.1-0.6-0.3-0.8c-0.9-0.9-1.1-2.2-0.5-3.4l0.7-1.5c0-0.1,0.1-0.2,0.1-0.3c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0-0.1,0-0.3-0.1-0.4c0,0,0-0.1,0-0.1c0-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0c-0.9-0.9-1.1-2.2-0.5-3.4L28.9,9.4z M26.6,14.8l-11.6,8L5,16.5v-3.6l9.5,6c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2l10.3-7.1C25.8,12.8,26,13.8,26.6,14.8z M15,28.8L5,22.5v-3.6l9.5,6c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2l10.3-7.1c-0.1,1.1,0.1,2.2,0.7,3.1L15,28.8z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M16,21c-1.3,0-2.6-0.5-3.5-1.5C11.5,18.6,11,17.3,11,16s0.5-2.6,1.5-3.5c1.9-1.9,5.1-1.9,7.1,0c0.9,0.9,1.5,2.2,1.5,3.5s-0.5,2.6-1.5,3.5l0,0l0,0C18.6,20.5,17.3,21,16,21z"/></g><path d="M11.1,20.9c-0.9-0.9-1.6-2.1-1.9-3.4c-2.7,2.4-5.6,4.7-8.6,6.8c-0.2,0.2-0.4,0.4-0.4,0.7c0,0.3,0.1,0.6,0.3,0.8l5.7,5.7c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0c0.3,0,0.6-0.2,0.7-0.4c2.1-3,4.4-5.9,6.8-8.6C13.2,22.5,12,21.9,11.1,20.9z"/><path d="M31.5,6.1l-5.7-5.7c-0.2-0.2-0.5-0.3-0.8-0.3c-0.3,0-0.6,0.2-0.7,0.4c-2.1,3-4.4,5.9-6.8,8.6c1.3,0.3,2.4,0.9,3.4,1.9c0.9,0.9,1.6,2.1,1.9,3.4c2.7-2.4,5.6-4.7,8.6-6.8c0.2-0.2,0.4-0.4,0.4-0.7C31.9,6.6,31.7,6.3,31.5,6.1z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M29,2H3C2.4,2,2,2.4,2,3v18c0,0.6,0.4,1,1,1h8.6l-2.6,7.7c-0.2,0.5,0.1,1.1,0.6,1.3c0.5,0.2,1.1-0.1,1.3-0.6l1.4-4.3h7.2l1.4,4.3c0.1,0.4,0.5,0.7,0.9,0.7c0.1,0,0.2,0,0.3-0.1c0.5-0.2,0.8-0.7,0.6-1.3L20.4,22H29c0.6,0,1-0.4,1-1V3C30,2.4,29.6,2,29,2zM18.9,24h-5.9l0.7-2h4.6L18.9,24z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M6,19v8c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-8H6z M21,24c0,1.7-1.3,3-3,3h-4c-1.7,0-3-1.3-3-3v-2c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1V24z"/><g><path d="M22,7.-3C26,11.1,24.4,8.5,22,7.1z"/><path d="M10,7.1c-2.4,1.4-4,4-4,6.9v3h4V7.1z"/></g><g><path d="M19,8h-6c-0.6,0-1-0.4-1-1V5c0-1.7,1.3-3,3-3h2c1.7,0,3,1.3,3,3v2C20,7.6,19.6,8,19,8z M14,6h4V5c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1V6z"/></g><path d="M18,6h-4c-0.7,0-1.4,0.1-2,0.3V7v1v9h8V8V7V6.3C19.4,6.1,18.7,6,18,6z"/><g><path d="M4,18.2c-1.2,0.4-2,1.5-2,2.8v4c0,1.3,0.8,2.4,2,2.8V18.2z"/></g><g><path d="M28,18.2v9.6c1.2-0.4,2-1.5,2-2.8v-4C30,19.7,29.2,18.6,28,18.2z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M27,3H11C9.3,3,8,4.8,8,7v14H7c-1.7,0-3,1.8-3,4s1.3,4,3,4h16c1.7,0,3-1.8,3-4V8h3c0.6,0,1-0.4,1-1C30,4.8,28.7,3,27,3zM12,10h6c0.6,0,1,0.4,1,1s-0.4,1-1,1h-6c-0.6,0-1-0.4-1-1S11.4,10,12,10z M12,13h3c0.6,0,1,0.4,1,1s-0.4,1-1,1h-3c-0.6,0-1-0.4-1-1S11.4,13,12,13z M20.4,27H7c-0.4,0-1-0.8-1-2s0.6-2,1-2h13.4c-0.3,0.6-0.4,1.3-0.4,2S20.2,26.4,20.4,27z M26.1,6c0.2-0.6,0.6-1,0.9-1s0.6,0.4,0.9,1H26.1z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M11,1H9C7.3,1,6,2.3,6,4v1h4c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h3c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h4c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h3c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v3h4c0.6,0,1,0.4,1,1s-0.4,1-1,1H6v1c0,1.7,1.3,3,3,3h2c1.7,0,3-1.3,3-3V4C14,2.3,12.7,1,11,1z"/><g><path d="M26,6V4c0-1.7-1.3-3-3-3h-2c-1.7,0-3,1.3-3,3v2H26z"/><path d="M18,8v18c0,0.2,0.1,0.4,0.2,0.6l3,4c0.2,0.3,0.5,0.4,0.8,0.4s0.6-0.1,0.8-0.4l3-4c0.1-0.2,0.2-0.4,0.2-0.6V8H18z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M23,28L23,28c-1.1,0-2.1-0.7-2.5-1.8c0-0.1,0-0.2-0.1-0.2h-8.9c0,0.1,0,0.2-0.1,0.2C11.1,27.3,10.1,28,9,28h0c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S23.6,28,23,28z"/><path d="M27,3H5C3.3,3,2,4.3,2,6v15c0,1.7,1.3,3,3,3h6.9h8.1H27c1.7,0,3-1.3,3-3V6C30,4.3,28.7,3,27,3z"/></g><path class="st0" d="M15,20V10c0-1.7-1.3-3-3-3H7C6.4,7,6,7.4,6,8v8c0,0.6,0.4,1,1,1h5C13.7,17,15,18.3,15,20L15,20"/><path class="st0" d="M17,20V10c0-1.7,1.3-3,3-3h5c0.6,0,1,0.4,1,1v8c0,0.6-0.4,1-1,1h-5C18.3,17,17,18.3,17,20L17,20"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M19,22V12c0-1.7-1.3-3-3-3h-5c-0.6,0-1,0.4-1,1v8c0,0.6,0.4,1,1,1h5C17.7,19,19,20.3,19,22L19,22"/><path d="M20,22V12c0-1.7,1.3-3,3-3h5c0.6,0,1,0.4,1,1v8c0,0.6-0.4,1-1,1h-5C21.3,19,20,20.3,20,22L20,22"/><path d="M16,22H6H4V8h2h10h2V5c0-1.7-1.3-3-3-3H5C3.3,2,2,3.3,2,5v22c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-5H16z M11,27H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S11.6,27,11,27z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M19.1,11.1c-0.1-0.2-0.3-0.3-0.4-0.3c-0.9,0.2-1.7,0-2-0.5c-0.3-0.5-0.1-1.3,0.6-2c0.1-0.1,0.1-0.4,0-0.5c-0.9-0.9-2-1.6-3.3-1.9c-0.2-0.1-0.4,0.1-0.5,0.3C13.2,7,12.6,7.6,12,7.6S10.8,7,10.5,6.1c-0.1-0.2-0.3-0.3-0.5-0.3c-1.3,0.3-2.4,1-3.3,1.9c-0.1,0.1-0.1,0.4,0,0.5c0.6,0.7,0.9,1.5,0.6,2c-0.3,0.5-1.1,0.7-2,0.5c-0.2,0-0.4,0.1-0.4,0.3c-0.2,0.6-0.3,1.3-0.3,1.9s0.1,1.3,0.3,1.9c0.1,0.2,0.3,0.3,0.4,0.3c0.9-0.2,1.7,0,2,0.5c0.3,0.5,0.1,1.3-0.6,2c-0.1,0.1-0.1,0.4,0,0.5c0.9,0.9,2,1.6,3.3,1.9c0,0,0.1,0,0.1,0c0.2,0,0.3-0.1,0.4-0.3c0.3-0.9,0.8-1.5,1.5-1.5s1.2,0.6,1.5,1.5c0.1,0.2,0.3,0.3,0.5,0.3c1.3-0.3,2.4-1,3.3-1.9c0.1-0.1,0.1-0.4,0-0.5c-0.6-0.7-0.9-1.5-0.6-2c0.3-0.5,1.1-0.7,2-0.5c0.2,0,0.4-0.1,0.4-0.3c0.2-0.6,0.3-1.3,0.3-1.9S19.3,11.7,19.1,11.1z M12.9,13.4c-0.1,0.1-0.1,0.2-0.2,0.3C12.5,13.9,12.3,14,12,14c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1-0.1-0.3-0.1-0.4c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.4,1-0.4,1.4,0c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4C13,13.1,13,13.3,12.9,13.4z"/><path d="M28.9,17.6L26,11.8C25.9,6.4,21.4,2,16,2c-2.4,0-4.6,0.8-6.4,2.3C10.4,4.1,11.2,4,12,4c5,0,9,4,9,9c0,5-4,9-9,9c-1.1,0-2.1-0.2-3-0.5V27c0,0.5,0.3,0.9,0.8,1l10,2c0.1,0,0.1,0,0.2,0c0.2,0,0.5-0.1,0.6-0.2c0.2-0.2,0.4-0.5,0.4-0.8v-4h2c1.7,0,3-1.3,3-3v-3h2c0.3,0,0.7-0.2,0.9-0.5S29,17.9,28.9,17.6z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M6,7H0.9C0.4,7,0,7.4,0,7.9v9.1C0,17.6,0.4,18,0.9,18H6c1.7,0,3,1.3,3,3V10C9,8.3,7.7,7,6,7z"/><path d="M18.1,7H13c-1.7,0-3,1.3-3,3v11c0-1.7,1.3-3,3-3h5.1c0.5,0,0.9-0.4,0.9-0.9V7.9C19,7.4,18.6,7,18.1,7z"/></g><path d="M31.9,17.6L29,11.8C28.9,6.4,24.4,2,19,2c-2.8,0-5.4,1.2-7.3,3.2C12.1,5.1,12.5,5,13,5h5.1C19.7,5,21,6.3,21,7.9v9.1c0,1.6-1.3,2.9-2.9,2.9H13c-0.6,0-1,0.4-1,1v6c0,0.5,0.3,0.9,0.8,1l10,2c0.1,0,0.1,0,0.2,0c0.2,0,0.5-0.1,0.6-0.2c0.2-0.2,0.4-0.5,0.4-0.8v-4h2c1.7,0,3-1.3,3-3v-3h2c0.3,0,0.7-0.2,0.9-0.5S32,17.9,31.9,17.6z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M30.3,17.4c0-0.1,0-0.2,0-0.3l-3.6-9.7C26.2,6,25.1,5.2,23.7,5c-1.4-0.2-2.7,0.3-3.5,1.4c-0.3,0.4-0.2,1.1,0.2,1.4c0.4,0.3,1.1,0.2,1.4-0.2c0.4-0.5,1-0.8,1.6-0.7C24.1,7,24.6,7.4,24.8,8l2.4,6.6c-1-0.4-2.1-0.7-3.2-0.7c-3.1,0-5.8,1.8-6.7,4.2c-0.9-0.2-1.8-0.2-2.7,0C13.8,15.8,11.1,14,8,14c-1.2,0-2.3,0.2-3.2,0.7L7.2,8c0.2-0.6,0.7-1,1.4-1.1c0.6-0.1,1.2,0.2,1.6,0.7c0.3,0.4,1,0.5,1.4,0.2s0.5-1,0.2-1.4C11,5.3,9.7,4.8,8.3,5C6.9,5.2,5.8,6,5.3,7.3l-3.6,9.7c0,0.1,0,0.2,0,0.3C1.3,18.2,1,19.1,1,20c0,3.3,3.1,6,7,6c3.8,0,6.9-2.6,7-5.8c0.7-0.2,1.4-0.2,2,0c0.1,3.2,3.2,5.8,7,5.8c3.9,0,7-2.7,7-6C31,19.1,30.7,18.2,30.3,17.4z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M27,8V7c0-3.4-4.8-6-11-6S5,3.6,5,7v1c-1.7,0-3,1.3-3,3v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3c0-0.6,0.4-1,1-1v6.2c-1.2,0.4-2,1.5-2,2.8v6c0,0.6,0.4,1,1,1v1c0,1.7,1.3,3,3,3h1c1.7,0,3-1.3,3-3v-1h10v1c0,1.7,1.3,3,3,3h1c1.7,0,3-1.3,3-3v-1c0.6,0,1-0.4,1-1v-6c0-1.3-0.8-2.4-2-2.8V10c0.6,0,1,0.4,1,1v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3C30,9.3,28.7,8,27,8z M26,21c0,0.6-0.4,1-1,1h-1c-0.6,0-1-0.4-1-1s0.4-1,1-1h1C25.6,20,26,20.4,26,21z M25,16h-3h-3.6H17v-6h8V16z M21,5.8c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0.4-0.4,1-0.4,1.4,0c0,0,0.1,0.1,0.1,0.1c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2c0,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.2S22.1,7,22,7c-0.1,0-0.3,0-0.4-0.1c-0.1,0-0.2-0.1-0.3-0.2C21.1,6.5,21,6.3,21,6C21,5.9,21,5.9,21,5.8z M13,5h6c0.6,0,1,0.4,1,1s-0.4,1-1,1h-6c-0.6,0-1-0.4-1-1S12.4,5,13,5z M9,5.8c0-0.1,0-0.1,0.1-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0.1-0.1,0.1-0.1c0.4-0.4,1-0.4,1.4,0c0,0,0.1,0.1,0.1,0.1c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2c0,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.2S10.1,7,10,7C9.9,7,9.7,7,9.6,6.9c-0.1,0-0.2-0.1-0.3-0.2C9.1,6.5,9,6.3,9,6C9,5.9,9,5.9,9,5.8z M7,10h8v6h-1.4H10H7V10z M7,20h1c0.6,0,1,0.4,1,1s-0.4,1-1,1H7c-0.6,0-1-0.4-1-1S6.4,20,7,20z M19.3,24h-6.5c-0.7,0-1.3-0.7-1.1-1.4l0.9-3.6c0.1-0.6,0.5-0.9,1-0.9h4.9c0.4,0,0.8,0.4,1,1l0.9,3.6C20.5,23.3,20,24,19.3,24z"/></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><g><path d="M16,6c-2.9,0-5-1.3-5-3s2.1-3,5-3s5,1.3,5,3S18.9,6,16,6z"/></g><g><path d="M16,24.6c2.3,0,4.1-0.6,5-1.3V6.6C19.8,7.5,18,8,16,8s-3.8-0.5-5-1.4v16.7C11.9,24,13.7,24.6,16,24.6z"/><path d="M16,26.9c-1.7,0-3.2-0.3-4.5-0.7l3.6,5.4c0.2,0.3,0.5,0.4,0.8,0.4s0.6-0.2,0.8-0.4l3.6-5.4C19.2,26.6,17.7,26.9,16,26.9z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M29,9H3c-0.6,0-1,0.4-1,1v16c0,0.6,0.4,1,1,1h26c0.6,0,1-0.4,1-1V10C30,9.4,29.6,9,29,9z M15,23H7c-0.6,0-1-0.4-1-1c0-1.9,1-3.5,2.5-4.3C8.2,17.2,8,16.6,8,16c0-1.7,1.3-3,3-3s3,1.3,3,3c0,0.6-0.2,1.2-0.5,1.7C15,18.5,16,20.1,16,22C16,22.6,15.6,23,15,23z M25,21h-3c-0.6,0-1-0.4-1-1s0.4-1,1-1h3c0.6,0,1,0.4,1,1S25.6,21,25,21z M25,17h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S25.6,17,25,17z"/><g><path d="M20,11h-8c-0.6,0-1-0.4-1-1V9c0-2.8,2.2-5,5-5s5,2.2,5,5v1C21,10.6,20.6,11,20,11z M13,9h6c0-1.7-1.3-3-3-3S13,7.3,13,9z"/></g></svg>', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path d="M30.4,6.5c-0.2-1.1-0.8-2.3-1.7-3.2c-0.9-0.9-2-1.5-3.2-1.7c-1.2-0.2-2.4,0.2-3.2,1c0,0,0,0,0,0c0,0,0,0,0,0c-2.8,3.3-5.8,6.5-8.9,9.6c-0.2,0-0.5,0-0.7,0.1c-0.4,0.2-0.5,0.6-0.4,1c-3.1,3.1-6.3,6.1-9.7,9c-0.8,0.8-1.1,1.9-1,3.2c0.2,1.1,0.8,2.3,1.7,3.2c0.9,0.9,2,1.5,3.2,1.7c0.2,0,0.4,0,0.6,0c1,0,1.9-0.4,2.6-1.1c2.4-2.7,4.8-5.3,7.3-7.9V25c0,0.6,0.4,1,1,1s1-0.4,1-1v-4.9c0.7,1,1,2.4,1,4.4V29c0,0.6,0.4,1,1,1s1-0.4,1-1v-4.5c0-1.9-0.2-4.4-1.9-6.2c3-3,6.1-5.9,9.3-8.6c0,0,0,0,0,0c0,0,0,0,0,0C30.2,8.9,30.6,7.7,30.4,6.5z M25.5,10.4c-2.4,2.2-4.8,4.4-7.1,6.7c-0.1,0-0.2-0.1-0.3-0.1c-1.1-0.9-2.5-2.2-3.4-3.3c2.3-2.4,4.6-4.8,6.8-7.2c0.3,0.9,0.8,1.8,1.5,2.5C23.8,9.6,24.6,10.2,25.5,10.4z M8.2,28c-0.5,0.5-1.1,0.4-1.5,0.4c-0.7-0.1-1.5-0.5-2.1-1.1c-0.6-0.6-1-1.3-1.1-2.1c-0.1-0.4-0.1-1,0.3-1.4c3.2-2.8,6.4-5.7,9.4-8.7c1.1,1.3,2.5,2.6,3.6,3.5C13.9,21.7,11,24.8,8.2,28z"/></svg>'];
function zo(e2) {
  return n(No, e2);
}
var Ko = ["America/Lima", "America/Juneau", "Pacific/Auckland", "Europe/Warsaw", "Europe/London", "Asia/Taipei", "Asia/Shanghai", "Pacific/Majuro", "Asia/Tashkent", "America/Caracas", "Africa/Harare", "America/La_Paz", "Europe/Vilnius", "Asia/Tokyo", "Australia/Brisbane", "Africa/Casablanca", "Atlantic/South_Georgia", "Europe/Riga", "Asia/Baku", "America/St_Johns", "Asia/Riyadh", "Europe/Bratislava", "Europe/Rome", "Asia/Dhaka", "Asia/Kolkata", "Europe/Berlin", "America/Chicago", "America/Phoenix", "Asia/Seoul", "Australia/Melbourne", "Asia/Baghdad", "Asia/Karachi", "America/New_York", "Asia/Krasnoyarsk", "Europe/Paris", "America/Mexico_City", "Europe/Moscow", "Europe/Madrid", "Africa/Johannesburg", "Europe/Athens", "Asia/Tehran", "Pacific/Port_Moresby", "Europe/Bucharest", "Asia/Singapore", "America/Denver", "Europe/Prague", "Africa/Cairo", "Asia/Kamchatka", "Europe/Stockholm", "America/Santiago", "Africa/Nairobi", "Asia/Kuala_Lumpur", "Europe/Lisbon", "America/Monterrey", "Europe/Vienna", "America/Argentina/Buenos_Aires", "Europe/Dublin", "Europe/Copenhagen", "Pacific/Apia", "Europe/Zagreb", "America/Mazatlan", "America/Guyana", "America/Tijuana", "Africa/Monrovia", "Europe/Minsk", "Pacific/Honolulu", "America/Indiana/Indianapolis"];
function Oo(e2) {
  return n(Ko, e2);
}
function Jo(e2) {
  return n(() => ({ id: Bi(), title: Li({ charCount: 40 }), completed: v() }), e2);
}
var Vo = ["deposit", "withdrawal", "payment", "invoice"];
function Uo(e2) {
  return n(Vo, e2);
}
function jo(e2) {
  return n(() => `${n(["http", "https"])}://${ha()}.${ca()}`, e2);
}
var _o = ["Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/538.2.0 (KHTML, like Gecko) Chrome/32.0.862.0 Safari/538.2.0", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.2; Trident/4.1; .NET CLR 1.3.78921.4)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_9_8 rv:3.0; RU) AppleWebKit/537.2.2 (KHTML, like Gecko) Version/7.1.6 Safari/537.2.2", "Mozilla/5.0 (Windows; U; Windows NT 6.1) AppleWebKit/535.1.1 (KHTML, like Gecko) Chrome/38.0.882.0 Safari/535.1.1", "Mozilla/5.0 (Windows; U; Windows NT 5.3) AppleWebKit/536.1.1 (KHTML, like Gecko) Chrome/30.0.896.0 Safari/536.1.1", "Mozilla/5.0 (Windows NT 6.3; rv:15.9) Gecko/20100101 Firefox/15.9.2", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/6.0)", "Mozilla/5.0 (Windows; U; Windows NT 6.2) AppleWebKit/537.0.1 (KHTML, like Gecko) Chrome/16.0.885.0 Safari/537.0.1", "Mozilla/5.0 (Windows; U; Windows NT 6.2) AppleWebKit/532.2.1 (KHTML, like Gecko) Chrome/34.0.818.0 Safari/532.2.1", "Mozilla/5.0 (Windows; U; Windows NT 6.1) AppleWebKit/536.1.2 (KHTML, like Gecko) Chrome/15.0.867.0 Safari/536.1.2", "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko", "Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:13.0) Gecko/20100101 Firefox/13.0.0", "Mozilla/5.0 (Windows; U; Windows NT 5.0) AppleWebKit/538.0.1 (KHTML, like Gecko) Chrome/14.0.814.0 Safari/538.0.1", "Mozilla/5.0 (Windows; U; Windows NT 5.3) AppleWebKit/532.0.2 (KHTML, like Gecko) Chrome/33.0.871.0 Safari/532.0.2", "Mozilla/5.0 (Windows; U; Windows NT 5.3) AppleWebKit/537.2.0 (KHTML, like Gecko) Chrome/35.0.864.0 Safari/537.2.0", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.3; Trident/6.1; .NET CLR 4.8.82855.9)", "Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/537.1.1 (KHTML, like Gecko) Chrome/21.0.863.0 Safari/537.1.1", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/6.1; .NET CLR 2.7.77884.9)"];
function Yo(e2) {
  return n(_o, e2);
}
var Qo = ["Toyota Volt", "Rolls Royce XC90", "Nissan Fiesta", "Mercedes Benz A4", "Bugatti 1", "Mini Explorer", "Nissan Spyder", "Kia Spyder", "Ford Camry", "Bugatti Corvette", "Toyota A4", "Toyota Challenger", "Smart Focus", "Mazda Challenger", "Lamborghini F-150", "Lamborghini Prius", "Hyundai Roadster", "Chevrolet Malibu"];
function $o(e2) {
  return n(Qo, e2);
}
var Zo = ["Gasoline", "Hybrid", "Electric", "Diesel"];
function Xo(e2) {
  return n(Zo, e2);
}
var en = ["Abarth", "Acura", "Alpine", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Caterham", "Chrysler", "Citroën", "Chevrolet", "Dacia", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Hennessey", "Honda", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes Benz", "Mini", "Mitsubishi", "Morgan", "Nissan", "Opel", "Pagani", "Peugeot", "Plymouth", "Polestar", "Pontiac", "Porsche", "Renault", "Rimac", "Rolls Royce", "SEAT", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];
function an(e2) {
  return n(en, e2);
}
var tn = ["296 GTB", "4Runner", "500", "718", "911", "A-Class", "A2", "A3", "A4", "A6", "A7", "A8", "Accord", "Alpine", "Arteon", "Atlas", "Avalon", "Aventador", "Aviator", "Blazer", "Bronco", "C-Class", "C-HR", "Camaro", "Camry", "Cayenne", "Chiron", "Civic", "Clarity", "Clubman", "Colorado", "Corolla", "Corsair", "Corvette", "Countryman", "CR-V", "CT-4", "CT-5", "CX-9", "Duster", "e-tron", "E-Class", "Edge", "Elantra", "Escalade", "EQS", "EV-6", "Expedition", "Explorer", "F-150", "Fiesta", "Forester", "Ghibli", "Giulia", "GR86", "Grand Cherokee", "Grecale", "Golf", "Highlander", "HR-V", "Huracan", "ID.4", "Impreza", "Insight", "Ioniq", "Jetta", "John Cooper Works", "Kona", "Land Cruiser", "Legacy", "Levante", "Logan", "Lyriq", "M3", "M4", "M5", "Macan", "Malibu", "Maverick", "Mirai", "Model 3", "Model S", "Model X", "Model Y", "Mustang", "Nautilus", "Navigator", "Niro", "Outback", "Odyssey", "Palisade", "Panamera", "Passat", "Passport", "Portofino", "Prius", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Quattroporte", "Ranger", "R8", "RAV4", "Rio", "Roma", "S-Class", "Sandero", "Santa fe", "Sequoia", "Sentra", "Sienna", "Silverado", "Sonata", "Sorento", "Spark", "Sportage", "Spring", "Stelvio", "Stinger", "Suburban", "Super Duty", "Supra", "Tacoma", "Tahoe", "Tacoma", "Taos", "Taurus", "Taycan", "Tiguan", "Tonale", "Touareg", "Trailblazer", "TT", "Tucson", "Tundra", "Urus", "Veloster", "Venza", "Veyron", "Wrangler", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "XT4", "XT5", "Yaris", "Z4"];
function on(e2) {
  return n(tn, e2);
}
var nn = ["Sedan", "Crew Cab Pickup", "Minivan", "Extended Cab Pickup", "Wagon", "SUV", "Cargo Van", "Coupe", "Hatchback", "Convertible", "Passenger Van"];
function rn(e2) {
  return n(nn, e2);
}
var sn = ["bypass", "index", "transmit", "parse", "synthesize", "compress", "reboot", "quantify", "hack", "back up", "program", "generate", "override", "input", "connect", "copy", "calculate", "navigate"];
function ln(e2) {
  return n(sn, e2);
}
var un = ["Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday", "Sunday"];
function cn(e2) {
  return n(un, e2);
}
var dn = ["Mary J. Blige", "Steven Tyler", "Stevie Nicks", "Joe Cocker", "B.B. King", "Patti LaBelle", "Karen Carpenter", "Annie Lennox", "Morrissey", "Levon Helm", "The Everly Brothers", "Solomon Burke", "Willie Nelson", "Don Henley", "Art Garfunkel", "Sam Moore", "Darlene Love", "Patti Smith", "Tom Waits", "John Lee Hooker", "Frankie Valli", "Mariah Carey", "Sly Stone", "Merle Haggard", "Steve Perry", "Iggy Pop", "James Taylor", "Dolly Parton", "John Fogerty", "Toots Hibbert", "Gregg Allman", "Ronnie Spector", "Wilson Pickett", "Jerry Lee Lewis", "Thom Yorke", "David Ruffin", "Axl Rose", "Dion", "Lou Reed", "Roger Daltrey", "Björk", "Rod Stewart", "Christina Aguilera", "Eric Burdon", "Mavis Staples", "Paul Rodgers", "Luther Vandross", "Muddy Waters", "Brian Wilson", "Gladys Knight", "Bonnie Raitt", "Donny Hathaway", "Buddy Holly", "Jim Morrison", "Patsy Cline", "Kurt Cobain", "Bobby Blue Bland", "George Jones", "Joni Mitchell", "Chuck Berry", "Curtis Mayfield", "Jeff Buckley", "Elton John", "Neil Young", "Bruce Springsteen", "Dusty Springfield", "Whitney Houston", "Steve Winwood", "Bono", "Howlin' Wolf", "Prince", "Nina Simone", "Janis Joplin", "Hank Williams", "Jackie Wilson", "Michael Jackson", "Van Morrison", "David Bowie", "Etta James", "Johnny Cash", "Smokey Robinson", "Bob Marley", "Freddie Mercury", "Tina Turner", "Mick Jagger", "Robert Plant", "Al Green", "Roy Orbison", "Little Richard", "Paul McCartney", "James Brown", "Stevie Wonder", "Otis Redding", "Bob Dylan", "Marvin Gaye", "John Lennon", "Sam Cooke", "Elvis Presley", "Ray Charles", "Aretha Franklin"];
function hn(e2) {
  return n(dn, e2);
}
var mn = ["The twist", "Smooth", "Mack the knife", "Uptown funk!", "How do i live", "Party rock anthem", "I gotta feeling", "Macarena (bayside boys mix)", "Shape of you", "Physical", "You light up my life", "Hey jude", "Closer", "We belong together", "Un-break my heart", "Yeah!", "Bette davis eyes", "Endless love", "Tonight’s the night (gonna be alright)", "You were meant for me/foolish games", "(everything i do) i do it for you", "I’ll make love to you", "The theme from “a summer place”", "Le freak", "How deep is your love", "Eye of the tiger", "We found love", "Low", "Just want to be your everything", "Too close", "Every breath you take", "Somebody that i used to know", "Despacito", "Flashdance… what a feeling", "Rolling in the deep", "Tossin’ and turnin’", "The battle of new orleans", "One sweet day", "Truly madly deeply", "Silly love songs", "Let’s get it on", "Night fever", "Another one bites the dust", "Say say say", "How you remind me", "Tie a yellow ribbon round the ole oak tree", "It's all in the game", "I want to hold your hand", "Shadow dancing", "Call me maybe", "Blurred lines", "Candle in the wind ‘97/something about the way you look tonight", "No one", "I will always love you", "End of the road", "Boom boom pow", "Call me", "Let me love you", "Stayin’ alive", "Lady", "Tik tok", "I’m a believer", "Gold digger", "Apologize", "The sign", "Centerfold", "All about that bass", "(just like) starting over", "Royals", "The boy is mine", "Because i love you (the postman song)", "I love rock ’n rolln", "Aquarius/let the sunshine in", "Whoomp! (there it is)", "Moves like jagger", "Ebony and ivory", "Rush rush", "That’s what friends are for", "Happy", "Upside down", "Sugar, sugar", "Just the way you are", "Dilemma", "I heard it through the grapevine", "You’re still the one", "Billie jean", "Hot stuff", "Rockstar", "Gangsta’s paradise", "Abracadabra", "Perfect", "You’re so vain", "Play that funky music", "Say you, say me", "My sharona", "All night long (all night)", "Nothing compares 2 u", "I swear", "Family affair", "Waiting for a girl like you"];
function pn(e2) {
  return n(mn, e2);
}
function yn(e2) {
  const a = e2?.includeCounty ?? true, t2 = e2?.includeCountry ?? true;
  return n(() => {
    const { street: e3, city: i2, county: o2, country: n2, zipCode: r2 } = Fi({ includeCounty: a, includeCountry: t2 });
    let s2 = `${e3}, ${i2}, `;
    return a && (s2 += `${o2}, `), t2 && (s2 += `${n2}, `), s2 + r2;
  }, e2);
}
var gn = ["Aegean Airlines", "Aer Lingus", "Aeroflot", "Aerolineas Argentinas", "Aeromexico", "Air Arabia", "Air Astana", "Air Austral", "Air Baltic", "Air Belgium", "Air Canada", "Air Caraibes", "Air China", "Air Corsica", "Air Dolomiti", "Air Europa", "Air France", "Air India", "Air India Express", "Air Macau", "Air Malta", "Air Mauritius", "Air Namibia", "Air New Zealand", "Air North", "Air Seoul", "Air Serbia", "Air Tahiti Nui", "Air Transat", "Air Vanuatu", "AirAsia", "AirAsia X", "Aircalin", "Alaska Airlines", "Alitalia", "Allegiant", "American Airlines", "ANA", "Asiana", "Austrian", "Avianca", "Azerbaijan Hava Yollary", "Azores Airlines", "Azul", "Bamboo Airways", "Bangkok Airways", "British Airways", "Brussels Airlines", "Caribbean Airlines", "Cathay Dragon", "Cathay Pacific", "Cayman Airways", "CEBU Pacific Air", "China Airlines", "China Eastern", "China Southern", "Condor", "Copa Airlines", "Croatia Airlines", "Czech Airlines", "Delta", "easyJet", "Edelweiss Air", "Egyptair", "EL AL", "Emirates", "Ethiopian Airlines", "Etihad", "Eurowings", "EVA Air", "Fiji Airways", "Finnair", "flydubai", "FlyOne", "French bee", "Frontier", "Garuda Indonesia", "Gol", "Gulf Air", "Hainan Airlines", "Hawaiian Airlines", "Helvetic Airways", "HK Express", "Hong Kong Airlines", "Iberia", "Icelandair", "IndiGo Airlines", "InterJet", "Japan Airlines", "Jeju Air", "Jet2", "JetBlue", "Jetstar", "Jin Air", "Kenya Airways", "KLM", "Korean Air", "Kulula", "La Compagnie", "LATAM", "Lion Airlines", "LOT Polish Airlines", "Lufthansa", "Luxair", "Malaysia Airlines", "Mango", "Middle East Airlines", "Nok Air", "Nordwind Airlines", "Norwegian Air International", "Norwegian Air Shuttle", "Norwegian Air Sweden", "Norwegian Air UK", "Oman Air", "Pakistan International Airlines", "Peach", "Pegasus Airlines", "Philippine Airlines", "Porter", "Qantas", "Qatar Airways", "Regional Express", "Rossiya - Russian Airlines", "Royal Air Maroc", "Royal Brunei", "Royal Jordanian", "RwandAir", "Ryanair", "S7 Airlines", "SAS", "Saudia", "Scoot Airlines", "Shanghai Airlines", "Silkair", "Silver", "Singapore Airlines", "Skylanes", "South African Airways", "Southwest", "SpiceJet", "Spirit", "Spring Airlines", "Spring Japan", "SriLankan Airlines", "Sun Country", "Sunclass Airlines", "Sunwing", "SWISS", "Swoop", "TAAG", "TACA", "TAP Portugal", "THAI", "tigerair Australia", "Transavia Airlines", "TUI UK", "TUIfly", "Tunis Air", "Turkish Airlines", "Ukraine International", "United", "Ural Airlines", "UTair Aviation", "Uzbekistan Airways", "Vietnam Airlines", "Virgin Atlantic", "Virgin Australia", "Vistara", "Viva Aerobus", "Volaris", "Volotea", "Vueling Airlines", "WestJet", "Wizzair", "Xiamen Airlines"];
function fn(e2) {
  return n(gn, e2);
}
var bn = { RyanAir: { prefix: "FR" }, "British Airways": { prefix: "BA", suffixMin: 100, suffixMax: 999 }, Iberia: { prefix: "IB" }, Jet2: { prefix: "LS" }, EasyJet: { prefix: "EZY", suffixMin: 100, suffixMax: 999 }, Emirates: { prefix: "EK", suffixMin: 10, suffixMax: 99 }, "American Airlines": { prefix: "AA" }, JetBlue: { prefix: "B", suffixMin: 100, suffixMax: 999 }, "Air Europa": { prefix: "UX" }, "Delta Air Lines": { prefix: "DL" }, "United Airlines": { prefix: "UA" }, "Virgin Atlantic": { prefix: "VS" }, "Thai Airways": { prefix: "TG" }, "Qatar Airways": { prefix: "QR" } };
function wn(e2) {
  const a = e2?.airline ?? wa(gn);
  return n(() => bn[a] ? function({ prefix: e3, suffixMin: a2 = 1e3, suffixMax: t2 = 9999 }) {
    return `${e3}${s({ min: a2, max: t2 })}`;
  }(bn[a]) : s({ min: 1e4, max: 99999 }).toString(), e2);
}
function vn(e2) {
  return n(() => `${s({ min: 1, max: 33 })}${wa(["A", "B", "C", "D", "E", "F"])}`, e2);
}
var kn = [{ name: "Hartsfield–Jackson Atlanta International Airport", code: "ATL", city: "Atlanta", country: "United States" }, { name: "Los Angeles International Airport", code: "LAX", city: "Los Angeles", country: "United States" }, { name: "O'Hare International Airport", code: "ORD", city: "Chicago", country: "United States" }, { name: "Dallas-Fort Worth International Airport", code: "DFW", city: "Dallas", country: "United States" }, { name: "Denver International Airport", code: "DEN", city: "Denver", country: "United States" }, { name: "John F. Kennedy International Airport", code: "JFK", city: "New York", country: "United States" }, { name: "San Francisco International Airport", code: "SFO", city: "San Francisco", country: "United States" }, { name: "McCarran International Airport", code: "LAS", city: "Las Vegas", country: "United States" }, { name: "Toronto Pearson International Airport", code: "YYZ", city: "Toronto", country: "Canada" }, { name: "Seattle–Tacoma International Airport", code: "SEA", city: "Seattle", country: "United States" }, { name: "Charlotte Douglas International Airport", code: "CLT", city: "Charlotte", country: "United States" }, { name: "Orlando International Airport", code: "MCO", city: "Orlando", country: "United States" }, { name: "Miami International Airport", code: "MIA", city: "Miami", country: "United States" }, { name: "Phoenix Sky Harbor International Airport", code: "PHX", city: "Phoenix", country: "United States" }, { name: "Newark Liberty International Airport", code: "EWR", city: "Newark", country: "United States" }, { name: "George Bush Intercontinental Houston Airport", code: "IAH", city: "Houston", country: "United States" }, { name: "Minneapolis-St Paul International/Wold-Chamberlain Airport", code: "MSP", city: "Minneapolis", country: "United States" }, { name: "Logan International Airport", code: "BOS", city: "Boston", country: "United States" }, { name: "Detroit Metropolitan Wayne County Airport", code: "DTW", city: "Detroit", country: "United States" }, { name: "Fort Lauderdale Hollywood International Airport", code: "FLL", city: "Fort Lauderdale", country: "United States" }, { name: "Orlando Executive Airport", code: "ORL", city: "Orlando", country: "United States" }, { name: "LaGuardia Airport", code: "LGA", city: "New York", country: "United States" }, { name: "Philadelphia International Airport", code: "PHL", city: "Philadelphia", country: "United States" }, { name: "Baltimore/Washington International Thurgood Marshall Airport", code: "BWI", city: "Baltimore", country: "United States" }, { name: "Salt Lake City International Airport", code: "SLC", city: "Salt Lake City", country: "United States" }, { name: "Vancouver International Airport", code: "YVR", city: "Vancouver", country: "Canada" }, { name: "Ronald Reagan Washington National Airport", code: "DCA", city: "Washington", country: "United States" }, { name: "Washington Dulles International Airport", code: "IAD", city: "Washington", country: "United States" }, { name: "Midway International Airport", code: "MDW", city: "Chicago", country: "United States" }, { name: "San Diego International Airport", code: "SAN", city: "San Diego", country: "United States" }, { name: "O. R. Tambo International Airport", code: "JNB", city: "Johannesburg", country: "South Africa" }, { name: "Cairo International Airport", code: "CAI", city: "Cairo", country: "Egypt" }, { name: "Cape Town International Airport", code: "CPT", city: "Cape Town", country: "South Africa" }, { name: "Mohammed V International Airport", code: "CMN", city: "Casablanca", country: "Morocco" }, { name: "Addis Ababa Bole International Airport", code: "ADD", city: "Addis Ababa", country: "Ethiopia" }, { name: "Houari Boumediene Airport", code: "ALG", city: "Algier", country: "Algeria" }, { name: "Jomo Kenyatta International Airport", code: "NBO", city: "Nairobi", country: "Kenya" }, { name: "Murtala Muhammed International Airport", code: "LOS", city: "Lagos", country: "Nigeria" }, { name: "Tunis Carthage International Airport", code: "TUN", city: "Tunis", country: "Tunisia" }, { name: "King Shaka International Airport", code: "DUR", city: "Durban", country: "South Africa" }, { name: "Menara Airport", code: "RAK", city: "Marrakech", country: "Morocco" }, { name: "Hurghada International Airport", code: "HRG", city: "Hurghada", country: "Egypt" }, { name: "Monastir Habib Bourguiba International Airport", code: "MIR", city: "Monastir", country: "Tunisia" }, { name: "Sir Seewoosagur Ramgoolam International Airport", code: "MRU", city: "Plaisance", country: "Mauritius" }, { name: "Nnamdi Azikiwe International Airport", code: "ABV", city: "Abuja", country: "Nigeria" }, { name: "Kotoka International Airport", code: "ACC", city: "Accra", country: "Ghana" }, { name: "Sharm El Sheikh International Airport", code: "SSH", city: "Sharm El Sheikh", country: "Egypt" }, { name: "Julius Nyerere International Airport", code: "DAR", city: "Dar Es Salaam", country: "Tanzania" }, { name: "Quatro de Fevereiro Airport", code: "LAD", city: "Luanda", country: "Angola" }, { name: "Roland Garros Airport", code: "RUN", city: "St.-denis", country: "Reunion" }, { name: "Khartoum International Airport", code: "KRT", city: "Khartoum", country: "Sudan" }, { name: "Léopold Sédar Senghor International Airport", code: "DKR", city: "Dakar", country: "Senegal" }, { name: "Félix-Houphouët-Boigny International Airport", code: "ABJ", city: "Abidjan", country: "Cote d'Ivoire" }, { name: "Es Senia Airport", code: "ORN", city: "Oran", country: "Algeria" }, { name: "Borg El Arab Airport", code: "HBE", city: "Alexandria", country: "Egypt" }, { name: "Port Elizabeth International Airport", code: "PLZ", city: "Port Elizabeth", country: "South Africa" }, { name: "Agadir–Al Massira Airport", code: "AGA", city: "Agadir", country: "Morocco" }, { name: "Entebbe International Airport", code: "EBB", city: "Entebbe", country: "Uganda" }, { name: "Douala International Airport", code: "DLA", city: "Douala", country: "Cameroon" }, { name: "Djerba–Zarzis International Airport", code: "DJE", city: "Djerba", country: "Tunisia" }, { name: "Beijing Capital International Airport", code: "PEK", city: "Beijing", country: "China" }, { name: "Dubai International Airport", code: "DXB", city: "Dubai", country: "United Arab Emirates" }, { name: "Haneda Airport", code: "HND", city: "Tokyo", country: "Japan" }, { name: "Hong Kong International Airport", code: "HKG", city: "Hong Kong", country: "Hong Kong" }, { name: "Shanghai Pudong International Airport", code: "PVG", city: "Shanghai", country: "China" }, { name: "Guangzhou Baiyun International Airport", code: "CAN", city: "Guangzhou", country: "China" }, { name: "Indira Gandhi International Airport", code: "DEL", city: "Delhi", country: "India" }, { name: "Soekarno-Hatta International Airport", code: "CGK", city: "Jakarta", country: "Indonesia" }, { name: "Singapore Changi Airport", code: "SIN", city: "Singapore", country: "Singapore" }, { name: "Incheon International Airport", code: "ICN", city: "Seoul", country: "South Korea" }, { name: "Suvarnabhumi Airport", code: "BKK", city: "Bangkok", country: "Thailand" }, { name: "Kuala Lumpur International Airport", code: "KUL", city: "Kuala Lumpur", country: "Malaysia" }, { name: "Chengdu Shuangliu International Airport", code: "CTU", city: "Chengdu", country: "China" }, { name: "Chhatrapati Shivaji International Airport", code: "BOM", city: "Mumbai", country: "India" }, { name: "Shenzhen Bao'an International Airport", code: "SZX", city: "Shenzhen", country: "China" }, { name: "Taiwan Taoyuan International Airport", code: "TPE", city: "Taipei", country: "Taiwan" }, { name: "Kunming Changshui International Airport", code: "KMG", city: "Kunming", country: "China" }, { name: "Ninoy Aquino International Airport", code: "MNL", city: "Manila", country: "Philippines" }, { name: "Shanghai Hongqiao International Airport", code: "SHA", city: "Shanghai", country: "China" }, { name: "Xi'an Xianyang International Airport", code: "XIY", city: "Xi'an", country: "China" }, { name: "Narita International Airport", code: "NRT", city: "Tokyo", country: "Japan" }, { name: "Chongqing Jiangbei International Airport", code: "CKG", city: "Chongqing", country: "China" }, { name: "Don Mueang International Airport", code: "DMK", city: "Bangkok", country: "Thailand" }, { name: "Tan Son Nhat International Airport", code: "SGN", city: "Ho Chi Minh City", country: "Vietnam" }, { name: "Hamad International Airport", code: "DOH", city: "Doha", country: "Qatar" }, { name: "Hangzhou Xiaoshan International Airport", code: "HGH", city: "Hangzhou", country: "China" }, { name: "King Abdulaziz International Airport", code: "JED", city: "Jeddah", country: "Saudi Arabia" }, { name: "Jeju International Airport", code: "CJU", city: "Cheju", country: "South Korea" }, { name: "Kansai International Airport", code: "KIX", city: "Osaka", country: "Japan" }, { name: "Nanjing Lukou International Airport", code: "NKG", city: "Nanjing", country: "China" }, { name: "Sydney Airport", code: "SYD", city: "Sydney", country: "Australia" }, { name: "Melbourne Airport", code: "MEL", city: "Melbourne", country: "Australia" }, { name: "Brisbane International Airport", code: "BNE", city: "Brisbane", country: "Australia" }, { name: "Auckland International Airport", code: "AKL", city: "Auckland", country: "New Zealand" }, { name: "Perth International Airport", code: "PER", city: "Perth", country: "Australia" }, { name: "Adelaide International Airport", code: "ADL", city: "Adelaide", country: "Australia" }, { name: "Christchurch International Airport", code: "CHC", city: "Christchurch", country: "New Zealand" }, { name: "Gold Coast Airport", code: "OOL", city: "Coolangatta", country: "Australia" }, { name: "Wellington International Airport", code: "WLG", city: "Wellington", country: "New Zealand" }, { name: "Cairns International Airport", code: "CNS", city: "Cairns", country: "Australia" }, { name: "Canberra International Airport", code: "CBR", city: "Canberra", country: "Australia" }, { name: "Hobart International Airport", code: "HBA", city: "Hobart", country: "Australia" }, { name: "Darwin International Airport", code: "DRW", city: "Darwin", country: "Australia" }, { name: "Nadi International Airport", code: "NAN", city: "Nandi", country: "Fiji" }, { name: "Queenstown International Airport", code: "ZQN", city: "Queenstown International", country: "New Zealand" }, { name: "Townsville Airport", code: "TSV", city: "Townsville", country: "Australia" }, { name: "Launceston Airport", code: "LST", city: "Launceston", country: "Australia" }, { name: "Newcastle Airport", code: "NTL", city: "Newcastle", country: "Australia" }, { name: "Nelson Airport", code: "NSN", city: "Nelson", country: "New Zealand" }, { name: "Dunedin Airport", code: "DUD", city: "Dunedin", country: "New Zealand" }, { name: "Mackay Airport", code: "MKY", city: "Mackay", country: "Australia" }, { name: "Port Moresby Jacksons International Airport", code: "POM", city: "Port Moresby", country: "Papua New Guinea" }, { name: "Sunshine Coast Airport", code: "MCY", city: "Maroochydore", country: "Australia" }, { name: "Karratha Airport", code: "KTA", city: "Karratha", country: "Australia" }, { name: "Hawke's Bay Airport", code: "NPE", city: "NAPIER", country: "New Zealand" }, { name: "Rockhampton Airport", code: "ROK", city: "Rockhampton", country: "Australia" }, { name: "Palmerston North Airport", code: "PMR", city: "Palmerston North", country: "New Zealand" }, { name: "Alice Springs Airport", code: "ASP", city: "Alice Springs", country: "Australia" }, { name: "Hamilton Island Airport", code: "HTI", city: "Hamilton Island", country: "Australia" }, { name: "Port Hedland International Airport", code: "PHE", city: "Port Hedland", country: "Australia" }, { name: "Heathrow Airport", code: "LHR", city: "London", country: "United Kingdom" }, { name: "Charles de Gaulle International Airport", code: "CDG", city: "Paris", country: "France" }, { name: "Amsterdam Airport Schiphol", code: "AMS", city: "Amsterdam", country: "Netherlands" }, { name: "Frankfurt am Main International Airport", code: "FRA", city: "Frankfurt", country: "Germany" }, { name: "Istanbul Atatürk Airport", code: "IST", city: "Istanbul", country: "Turkey" }, { name: "Adolfo Suárez Madrid–Barajas Airport", code: "MAD", city: "Madrid", country: "Spain" }, { name: "Barcelona–El Prat Airport", code: "BCN", city: "Barcelona", country: "Spain" }, { name: "Gatwick Airport", code: "LGW", city: "London", country: "United Kingdom" }, { name: "Munich Airport", code: "MUC", city: "Munich", country: "Germany" }, { name: "Leonardo da Vinci–Fiumicino Airport", code: "FCO", city: "Rome", country: "Italy" }, { name: "Sheremetyevo International Airport", code: "SVO", city: "Moscow", country: "Russia" }, { name: "Sabiha Gökçen International Airport", code: "SAW", city: "Istanbul", country: "Turkey" }, { name: "Moscow Domodedovo Airport", code: "DME", city: "Moscow", country: "Russia" }, { name: "Dublin Airport", code: "DUB", city: "Dublin", country: "Ireland" }, { name: "Zürich Airport", code: "ZRH", city: "Zurich", country: "Switzerland" }, { name: "Copenhagen Airport", code: "CPH", city: "Copenhagen", country: "Denmark" }, { name: "Palma De Mallorca Airport", code: "PMI", city: "Palma de Mallorca", country: "Spain" }, { name: "Manchester Airport", code: "MAN", city: "Manchester", country: "United Kingdom" }, { name: "Oslo Airport, Gardermoen", code: "OSL", city: "Oslo", country: "Norway" }, { name: "Lisbon Portela Airport", code: "LIS", city: "Lisbon", country: "Portugal" }, { name: "Stockholm Arlanda Airport", code: "ARN", city: "Stockholm", country: "Sweden" }, { name: "Antalya Airport", code: "AYT", city: "Antalya", country: "Turkey" }, { name: "London Stansted Airport", code: "STN", city: "London", country: "United Kingdom" }, { name: "Brussels Airport", code: "BRU", city: "Brussels", country: "Belgium" }, { name: "Düsseldorf International Airport", code: "DUS", city: "Duesseldorf", country: "Germany" }, { name: "Vienna International Airport", code: "VIE", city: "Vienna", country: "Austria" }, { name: "Milan–Malpensa Airport", code: "MXP", city: "Milano", country: "Italy" }, { name: "Athens International Airport", code: "ATH", city: "Athens", country: "Greece" }, { name: "Berlin-Tegel International Airport", code: "TXL", city: "Berlin", country: "Germany" }, { name: "Helsinki Airport", code: "HEL", city: "Helsinki", country: "Finland" }, { name: "Málaga Airport", code: "AGP", city: "Malaga", country: "Spain" }, { name: "Mexico City International Airport", code: "MEX", city: "Mexico City", country: "Mexico" }, { name: "São Paulo–Guarulhos International Airport", code: "GRU", city: "Sao Paulo", country: "Brazil" }, { name: "El Dorado International Airport", code: "BOG", city: "Bogota", country: "Colombia" }, { name: "Cancún International Airport", code: "CUN", city: "Cancun", country: "Mexico" }, { name: "Comodoro Arturo Merino Benítez International Airport", code: "SCL", city: "Santiago", country: "Chile" }, { name: "Jorge Chávez International Airport", code: "LIM", city: "Lima", country: "Peru" }, { name: "São Paulo–Congonhas Airport", code: "CGH", city: "Sao Paulo", country: "Brazil" }, { name: "Presidente Juscelino Kubistschek International Airport", code: "BSB", city: "Brasilia", country: "Brazil" }, { name: "Rio de Janeiro–Galeão International Airport", code: "GIG", city: "Rio De Janeiro", country: "Brazil" }, { name: "Tocumen International Airport", code: "PTY", city: "Panama City", country: "Panama" }, { name: "Aeroparque Jorge Newbery", code: "AEP", city: "Buenos Aires", country: "Argentina" }, { name: "Guadalajara International Airport", code: "GDL", city: "Guadalajara", country: "Mexico" }, { name: "Ministro Pistarini International Airport", code: "EZE", city: "Buenos Aires", country: "Argentina" }, { name: "Tancredo Neves International Airport", code: "CNF", city: "Belo Horizonte", country: "Brazil" }, { name: "Monterrey International Airport", code: "MTY", city: "Monterrey", country: "Mexico" }, { name: "Viracopos International Airport", code: "VCP", city: "Campinas", country: "Brazil" }, { name: "Santos Dumont Airport", code: "SDU", city: "Rio De Janeiro", country: "Brazil" }, { name: "Salgado Filho Airport", code: "POA", city: "Porto Alegre", country: "Brazil" }, { name: "Guararapes - Gilberto Freyre International Airport", code: "REC", city: "Recife", country: "Brazil" }, { name: "Deputado Luís Eduardo Magalhães International Airport", code: "SSA", city: "Salvador", country: "Brazil" }, { name: "General Abelardo L. Rodríguez International Airport", code: "TIJ", city: "Tijuana", country: "Mexico" }, { name: "Afonso Pena Airport", code: "CWB", city: "Curitiba", country: "Brazil" }, { name: "Pinto Martins International Airport", code: "FOR", city: "Fortaleza", country: "Brazil" }, { name: "José Martí International Airport", code: "HAV", city: "Havana", country: "Cuba" }, { name: "Juan Santamaria International Airport", code: "SJO", city: "San Jose", country: "Costa Rica" }, { name: "Maturín Airport", code: "MUN", city: "Maturin", country: "Venezuela" }, { name: "Hercílio Luz International Airport", code: "FLN", city: "Florianopolis", country: "Brazil" }, { name: "Val de Cans International Airport", code: "BEL", city: "Belem", country: "Brazil" }, { name: "Alejandro Velasco Astete International Airport", code: "CUZ", city: "Cuzco", country: "Peru" }, { name: "Santa Genoveva Airport", code: "GYN", city: "Goiania", country: "Brazil" }];
function Sn(e2) {
  return n(kn, e2);
}
function Cn(e2) {
  return n(() => {
    const a = e2?.airline ?? fn(), t2 = e2?.passenger ?? ja(), [i2, o2] = Sn({ length: 2 });
    return { passenger: t2, airline: a, flightNumber: wn({ airline: a }), origin: i2, destination: o2, date: Ya().toISOString(), seat: vn(), flightLength: 0.25 * Math.ceil(s({ min: 1, max: 9, fraction: 2 }) / 0.25) };
  }, e2);
}
function An(e2) {
  return n(() => {
    const a = e2?.fullName ?? `${ki()} ${ja({ withAccents: false })}`, t2 = e2?.brand ?? Re(), i2 = { month: "numeric", year: "2-digit" };
    return { fullName: a, brand: t2, validFrom: fi({ years: 1 }).toLocaleDateString("en-GB", i2), untilEnd: Ya({ years: 2 }).toLocaleDateString("en-GB", i2), ccv: qe(), number: He({ brand: t2 }), account: h(), type: wa(["Credit", "Debit"]) };
  }, e2);
}
var Mn = () => {
  const e2 = [v(), k(), k({ length: k({ min: 1, max: 10 }) }), hn(), hn({ length: k({ min: 1, max: 10 }) }), ii(), ii({ length: k({ min: 1, max: 10 }) }), ni(), ni({ length: k({ min: 1, max: 10 }) }), ha(), ha({ length: k({ min: 1, max: 10 }) }), So(), So({ length: k({ min: 1, max: 10 }) }), qi(), qi({ length: k({ min: 1, max: 10 }) }), Fi(), Fi({ length: k({ min: 1, max: 10 }) }), Vi(), Vi({ length: k({ min: 1, max: 10 }) }), Cn(), Cn({ length: k({ min: 1, max: 10 }) }), An(), An({ length: k({ min: 1, max: 10 }) })];
  return e2[k({ min: 0, max: e2.length - 1 })];
};
function Tn(e2) {
  const a = e2?.totalKeys ?? k({ min: e2?.minKeys || 1, max: e2?.maxKeys || 99 });
  return n(() => {
    const e3 = {};
    for (let t2 = 0; t2 < a; t2++)
      e3[Bi().replace(/-/g, "")] = Mn();
    return e3;
  }, e2);
}
var Bn = { bash: '#!/bin/bash\n\nmove()\n{\n  local n="$1"\n  local from="$2"\n  local to="$3"\n  local via="$4"\n\n  if [[ "$n" == "1" ]]\n  then\n    echo "Move disk from pole $from to pole $to"\n  else\n    move $(($n - 1)) $from $via $to\n    move 1 $from $to $via\n    move $(($n - 1)) $via $to $from\n  fi\n}\n\nmove $1 $2 $3 $4', c: '#include <stdio.h>\n\nvoid move(int n, int from, int via, int to) {\n   if (n > 1) {\n      move(n - 1, from, to, via);\n      printf("Move disk from pole %d to pole %d\\n", from, to);\n      move(n - 1, via, from, to);\n   } else {\n      printf("Move disk from pole %d to pole %d\\n", from, to);\n   }\n}\nint main() {\n   move(4, 1, 2, 3);\n   return 0;\n}', "c#": 'public void move(int n, int from, int to, int via) {\n  if (n == 1) {\n    System.Console.WriteLine("Move disk from pole " + from + " to pole " + to);\n  } else {\n    move(n - 1, from, via, to);\n    move(1, from, to, via);\n    move(n - 1, via, to, from);\n  }\n}', "c++": 'void move(int n, int from, int to, int via) {\n  if (n == 1) {\n    std::cout << "Move disk from pole " << from << " to pole " << to << std::endl;\n  } else {\n    move(n - 1, from, via, to);\n    move(1, from, to, via);\n    move(n - 1, via, to, from);\n  }\n}', css: ".hover-rotate {\n  overflow: hidden;\n  margin: 8px;\n  min-width: 240px;\n  max-width: 320px;\n  width: 100%;\n}\n\n.hover-rotate img {\n  transition: all 0.3s;\n  box-sizing: border-box;\n  max-width: 100%;\n}\n\n.hover-rotate:hover img {\n  transform: scale(1.3) rotate(5deg);\n}", go: "func fib(a int) int {\n  if a < 2 {\n      return a\n  }\n  return fib(a - 1) + fib(a - 2)\n}", html: '<form action="http://maps.google.com/maps" method="get" target="_blank">\n  <label for="saddr">Enter your location</label>\n  <input type="text" name="saddr" />\n  <input type="hidden" name="daddr" value="350 5th Ave New York, NY 10018 (Empire State Building)" />\n  <input type="submit" value="Get directions" />\n</form>', java: 'public void move(int n, int from, int to, int via) {\n  if (n == 1) {\n      System.out.println("Move disk from pole " + from + " to pole " + to);\n  } else {\n      move(n - 1, from, via, to);\n      move(1, from, to, via);\n      move(n - 1, via, to, from);\n  }\n}', javascript: 'function move(n, a, b, c) {\n  if (n > 0) {\n    move(n - 1, a, c, b);\n    console.log("Move disk from " + a + " to " + c);\n    move(n - 1, b, a, c);\n  }\n}\nmove(4, "A", "B", "C");', php: 'function move($n,$from,$to,$via) {\n  if ($n === 1) {\n    print("Move disk from pole $from to pole $to");\n  } else {\n    move($n-1,$from,$via,$to);\n    move(1,$from,$to,$via);\n    move($n-1,$via,$to,$from);\n  }\n}', python: 'def hanoi(ndisks, startPeg=1, endPeg=3):\n  if ndisks:\n    hanoi(ndisks - 1, startPeg, 6 - startPeg - endPeg)\n    print "Move disk %d from peg %d to peg %d" % (ndisks, startPeg, endPeg)\n    hanoi(ndisks - 1, 6 - startPeg - endPeg, endPeg)\n\nhanoi(ndisks=4)', rust: 'fn move_(n: i32, from: i32, to: i32, via: i32) {\n  if n > 0 {\n      move_(n - 1, from, via, to);\n      println!("Move disk from pole {} to pole {}", from, to);\n      move_(n - 1, via, to, from);\n  }\n}\n \nfn main() {\n  move_(4, 1,2,3);\n}', sql: "SELECT *\nFROM   call\nORDER  BY call.employee_id ASC,\n          call.start_time ASC;", swift: `func hanoi(n: Int, a: String, b: String, c: String) {
  if n > 0 {
    hanoi(n - 1, a: a, b: c, c: b)
    print("Move disk from \\\\(a) to \\\\(c)")
    hanoi(n - 1, a: b, b: a, c: c)
  }
}
  
hanoi(4, a: "A", b: "B", c: "C")';` };
function In(e2) {
  const a = e2?.lang ?? "javascript";
  return n(() => Bn[a], e2);
}
function Pn(e2) {
  const a = e2.min, t2 = e2.max;
  if (a >= t2)
    throw new Error("Min must be less than max");
  return n(() => Li({ charCount: s({ min: a, max: t2 }) }), e2);
}
function xn(e2) {
  return n(() => wa(kn.map(({ name: e3 }) => e3)), e2);
}
function Dn(e2) {
  return n(() => wa(kn.map(({ code: e3 }) => e3)), e2);
}
function Gn(e2) {
  return null == e2;
}
var Fn = (e2) => {
  const a = e2.replace(/ /g, "");
  if (11 !== a.length)
    return false;
  const t2 = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let i2 = 0;
  for (let e3 = 0; e3 < t2.length; e3++)
    i2 += (Number(String(a[e3])) - (0 == e3 ? 1 : 0)) * t2[e3];
  return i2 % 89 == 0;
};
function qn(e2 = { from: 1, step: 1 }) {
  if (0 === e2.step)
    throw new Error("`step` should be a number different than 0, for example: {from: 1, step: 1}");
  if (e2.from < 0)
    throw new Error("`from` should be a number greater than 0");
  if (!Gn(e2.to)) {
    if (e2.to < 0)
      throw new Error("`to` should be a number greater than from and greater than 0");
    if (e2.from > e2.to && e2.step > 0)
      throw new Error("`to` should be higher or equal to `from`, for example: {from: 1, to: 3}");
    if (e2.from < e2.to && e2.step < 0)
      throw new Error("`to` should be lower or equal to `from`, for example: {from: 5, to: 1, step: -1}");
  }
  let a = e2.from;
  return () => {
    if (!Gn(e2.to)) {
      if (e2.step > 0 && a > e2.to)
        return;
      if (e2.step < 0 && a < e2.to)
        return;
    }
    const t2 = a;
    return a += e2.step, t2;
  };
}
function Ln(e2 = { from: /* @__PURE__ */ new Date(), step: 864e5 }) {
  const a = new Date(e2.from), t2 = e2.to ? new Date(e2.to) : void 0;
  if (0 === e2.step)
    throw new Error("`step` should be a number different from 0, for example: {from: new Date(), step: 10}");
  if (!Gn(t2)) {
    if (a > t2 && e2.step > 0)
      throw new Error("`to` should be a date greater than or equal to `from`");
    if (a < t2 && e2.step < 0)
      throw new Error("`to` should be a date lower than or equal to `from`");
  }
  const i2 = qn({ from: a.getTime(), to: t2?.getTime(), step: e2.step });
  return () => {
    const e3 = i2();
    return e3 ? new Date(e3) : void 0;
  };
}
function Rn(e2) {
  const a = e2?.values ?? 2, t2 = e2?.totalValue ?? 100, i2 = e2?.noZeros ?? false;
  if (a <= 1)
    throw new Error("Values must be bigger than 1");
  if (t2 < 0)
    throw new Error("TotalValue must be positive");
  if (i2 && t2 < a)
    throw new Error("Values must be larger or equal to totalValue with the noZero option");
  return n(() => {
    const o2 = new Array(a).fill(i2 ? 1 : 0);
    let n2 = t2;
    i2 && (n2 -= a);
    for (let t3 = 0; t3 < a - 1; t3++) {
      const a2 = s({ min: 0, max: s({ min: 0, max: Math.max(n2, 0) }), fraction: e2?.fraction });
      n2 -= a2, o2[t3] += a2;
    }
    o2[o2.length - 1] += t2 - o2.reduce((e3, a2) => e3 + a2, 0);
    const r2 = [];
    for (; 0 !== o2.length; ) {
      const e3 = s({ min: 0, max: o2.length - 1, fraction: 0 }), [a2] = o2.splice(e3, 1);
      r2.push(a2);
    }
    return r2;
  }, e2);
}
function En(e2) {
  return n(() => {
    if (void 0 === e2?.chanceTrue && void 0 === e2?.chanceFalse)
      throw new Error("One of chanceTrue and chanceFalse must be provided");
    if (void 0 !== e2?.chanceTrue && void 0 !== e2?.chanceFalse)
      throw new Error("chanceTrue and chanceFalse can't both be provided");
    if (void 0 !== e2.chanceFalse)
      return Ra({ min: 0, max: 1, fraction: 15 }) >= e2.chanceFalse;
    if (void 0 !== e2.chanceTrue)
      return Ra({ min: 0, max: 1, fraction: 15 }) <= e2.chanceTrue;
    throw new Error("Unexpected error occurred");
  }, e2);
}
function Hn(e2, a) {
  return n(() => e2(a), a);
}
function Wn(e2) {
  return n(() => {
    const a = e2?.onlyValid ?? true;
    let t2 = "";
    do {
      t2 = k({ min: 0, max: 9, length: 11 }).map((e3) => String(e3)).join("");
    } while (!Fn(t2) && a);
    return t2;
  }, e2);
}
export {
  Ln as incrementalDate,
  qn as incrementalNumber,
  wa as rand,
  u as randAbbreviation,
  Wn as randAbn,
  d as randAccessory,
  h as randAccount,
  Fi as randAddress,
  Rn as randAggregation,
  fn as randAirline,
  Sn as randAirport,
  Dn as randAirportCode,
  xn as randAirportName,
  w as randAlpha,
  S as randAlphaNumeric,
  A as randAmericanFootballTeam,
  M as randAmount,
  P as randAnimal,
  B as randAnimalType,
  W as randArn,
  N as randAvatar,
  D as randAwsRegion,
  O as randAwsRequestId,
  K as randAwsService,
  V as randBaseballTeam,
  j as randBasketballTeam,
  Y as randBear,
  Q as randBetweenDate,
  ae as randBic,
  te as randBinary,
  oe as randBird,
  ne as randBitcoinAddress,
  se as randBook,
  v as randBoolean,
  ue as randBrand,
  de as randBrowser,
  me as randCardinalDirection,
  ye as randCat,
  fe as randCatchPhrase,
  we as randCetacean,
  En as randChanceBoolean,
  ke as randCity,
  Ce as randClothingSize,
  In as randCodeSnippet,
  Me as randColor,
  Be as randCompanyName,
  Pe as randCountry,
  X as randCountryCode,
  De as randCounty,
  Fe as randCow,
  An as randCreditCard,
  Re as randCreditCardBrand,
  qe as randCreditCardCVV,
  He as randCreditCardNumber,
  Ne as randCrocodilia,
  Ke as randCurrencyCode,
  Je as randCurrencyName,
  Ue as randCurrencySymbol,
  ta as randDatabase,
  _e as randDatabaseCollation,
  Qe as randDatabaseColumn,
  Ze as randDatabaseEngine,
  ea as randDatabaseType,
  oa as randDepartment,
  ra as randDirection,
  F as randDirectoryPath,
  la as randDog,
  ma as randDomainName,
  ca as randDomainSuffix,
  ya as randDrinks,
  Ca as randEmail,
  fa as randEmailProvider,
  Ma as randEmoji,
  Ba as randEthereumAddress,
  Pa as randFileExt,
  L as randFileName,
  Da as randFilePath,
  Fa as randFileType,
  va as randFirstName,
  La as randFish,
  Cn as randFlightDetails,
  wn as randFlightNumber,
  Ra as randFloat,
  Ha as randFontFamily,
  Wa as randFontSize,
  Ka as randFood,
  Ja as randFootballTeam,
  Ua as randFrequency,
  yn as randFullAddress,
  ja as randFullName,
  Ya as randFutureDate,
  Za as randGender,
  et as randGitBranch,
  st as randGitCommitEntry,
  rt as randGitCommitMessage,
  nt as randGitCommitSha,
  lt as randGitShortSha,
  ut as randHex,
  tt as randHexaDecimal,
  dt as randHorse,
  ht as randHsl,
  pt as randHttpMethod,
  yt as randIban,
  ft as randIceHockeyTeam,
  bt as randImg,
  vt as randIntegration,
  St as randIp,
  Ct as randIpv6,
  Tn as randJSON,
  Mt as randJobArea,
  Bt as randJobDescriptor,
  Pt as randJobTitle,
  Dt as randJobType,
  qt as randLanguage,
  Sa as randLastName,
  Lt as randLatitude,
  Wt as randLine,
  zt as randLines,
  Ot as randLion,
  Vt as randLocale,
  Ut as randLongitude,
  jt as randMac,
  _t as randMask,
  Qt as randMimeType,
  Zt as randMonth,
  ei as randMotorcycleManufacturer,
  ai as randMotorcylceManufacturer,
  ii as randMovie,
  ni as randMovieCharacter,
  si as randMusicGenre,
  li as randNearbyGPSCoordinate,
  k as randNumber,
  ci as randOAuthProvider,
  di as randOctal,
  mi as randOrdinalDirection,
  yi as randParagraph,
  gi as randPassword,
  fi as randPastDate,
  wi as randPermission,
  ki as randPersonTitle,
  Ci as randPhoneNumber,
  Mi as randPhrase,
  Ti as randPort,
  Ri as randPost,
  Hi as randPriority,
  Vi as randProduct,
  ji as randProductAdjective,
  Ji as randProductCategory,
  Ki as randProductDescription,
  Yi as randProductMaterial,
  Ni as randProductName,
  $i as randProgrammingLanguage,
  Xi as randPronoun,
  to as randProtocol,
  oo as randQuote,
  ro as randRabbit,
  so as randRecentDate,
  uo as randResolution,
  co as randRgb,
  mo as randRole,
  po as randRoutingNumber,
  vn as randSeatNumber,
  yo as randSemver,
  Ht as randSentence,
  b as randSequence,
  fo as randShape,
  hn as randSinger,
  wo as randSkill,
  vo as randSlug,
  So as randSnake,
  Ao as randSocial,
  pn as randSong,
  Mo as randSoonDate,
  Bo as randSports,
  Io as randSportsTeam,
  xo as randState,
  Go as randStateAbbr,
  qo as randStatus,
  Di as randStreetAddress,
  xi as randStreetName,
  Ro as randSubscriptionPlan,
  Ho as randSuperhero,
  Wo as randSuperheroName,
  zo as randSvg,
  ee as randSwift,
  Li as randText,
  Pn as randTextRange,
  Oo as randTimeZone,
  Jo as randTodo,
  Uo as randTransactionType,
  jo as randUrl,
  qi as randUser,
  Yo as randUserAgent,
  Ii as randUserName,
  Bi as randUuid,
  $o as randVehicle,
  Xo as randVehicleFuel,
  an as randVehicleManufacturer,
  on as randVehicleModel,
  rn as randVehicleType,
  ln as randVerb,
  cn as randWeekday,
  ha as randWord,
  Gi as randZipCode,
  i as random,
  o as seed,
  Hn as toCollection
};
//# sourceMappingURL=@ngneat_falso.js.map
