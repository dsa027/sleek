/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404/index.html","ec5ef266e5427d15a8a852ee28fffc72"],["/about/index.html","4c4498202b13a3169031019e2fc2bb60"],["/assets/css/main.css","bb743f0d59c4abf391a39cc56068b84d"],["/assets/img/GitHub-Mark-32px.png","f87561b8bb354ef83b09a66e54f70e08"],["/assets/img/bloc_jams_logo.png","af314a1e08a2607c0d7365d7139fb08f"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","46d089384d19077a7990aa13bbb16643"],["/assets/img/icons/icon-instagram.svg","386f48e7440160096385614b2ec91930"],["/assets/img/icons/icon-twitter.svg","d2508d22e42c11e177ae430d33b343d9"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","5aa56ac96362cc1bb12c2848a6b6c1b7"],["/assets/img/posts/arizona_facts_logo.png","8167b17b727a433ea3c207f7770db1ca"],["/assets/img/posts/arizona_facts_logo_placehold.png","90adfe60d775b6694a95fa190ddfc924"],["/assets/img/posts/arizona_facts_logo_thumb.png","d4d7e98bcb846832095aa5f0bf5d53e9"],["/assets/img/posts/bloc_chat_angular_logo.png","1c2db090f8d569db9b4a586e05e208d6"],["/assets/img/posts/bloc_chat_angular_logo_placehold.png","e984a5c4699e46309e88feb2cb49bcb5"],["/assets/img/posts/bloc_chat_angular_logo_thumb.png","643c22dea5f974a01ccb70f29ae83306"],["/assets/img/posts/bloc_chat_react_logo.png","50dd7c6377ae53936f5ae21743892fd8"],["/assets/img/posts/bloc_chat_react_logo_placehold.png","746f5ef546c30489480cd1c6d3aaa5ce"],["/assets/img/posts/bloc_chat_react_logo_thumb.png","b80d5370df1ce5c0905eb44d90e9f0a5"],["/assets/img/posts/bloc_jams_jquery_logo.png","a22cbf2bd0b808e9b3f79cac6e00dd14"],["/assets/img/posts/bloc_jams_jquery_logo_placehold.png","cd40699e60dad3e5a3288c9446cb3f6a"],["/assets/img/posts/bloc_jams_jquery_logo_thumb.png","854cfd92761c3ed251a44daa58b988a1"],["/assets/img/posts/bloc_jams_logo.png","c80876cd62b998e01a8e642301ea56fc"],["/assets/img/posts/bloc_jams_logo_placehold.png","ef04c99d791c927c23beb7127a2bde99"],["/assets/img/posts/bloc_jams_logo_thumb.png","8677ddf579868b10590621a21ebb73da"],["/assets/img/posts/bloc_jams_react_logo.png","b40c327d929ed1f5b97ce66fd7ff1dcb"],["/assets/img/posts/bloc_jams_react_logo_placehold.png","f409e14b54c3276a09fde0e3e566712c"],["/assets/img/posts/bloc_jams_react_logo_thumb.png","e94d236fa1b893319221609473d0f8c4"],["/assets/img/posts/bloccit_logo.png","7a0be70e44c214cb960d4762c3a43b64"],["/assets/img/posts/bloccit_logo_placehold.png","7957abc37cc400446222a6d81dfd6996"],["/assets/img/posts/bloccit_logo_thumb.png","d209f8c9bafe17da9e7633f63d02c04a"],["/assets/img/posts/blocipedia_logo.png","4e9af63f8447f151730e984c5b03a557"],["/assets/img/posts/blocipedia_logo_placehold.png","8235486690cef6349f80fbf1bf4549ce"],["/assets/img/posts/blocipedia_logo_thumb.png","79da0f95a2c036170ff63be07e7aa010"],["/assets/img/posts/bloctime_logo.png","2e5c9f27dcfd3d06c7db048d0f6842d6"],["/assets/img/posts/bloctime_logo_placehold.png","56d374d7ba8a3aecdc43ae5e8716df5e"],["/assets/img/posts/bro_science_trivia_logo.png","370f507ad1fb2fe6f211b32f2d62628a"],["/assets/img/posts/bro_science_trivia_logo_placehold.png","3aa1a137bb04b944d673a650230b489f"],["/assets/img/posts/bro_science_trivia_logo_thumb.png","a0f909542703f3149fcd6670431b3988"],["/assets/img/posts/pong_logo.png","0d719b06339e18d6ea528bfb3f722e8f"],["/assets/img/posts/pong_logo_placehold.png","6fa481937b3f3c965867a79058ce3bb6"],["/assets/img/posts/pong_logo_thumb.png","4140a96be5ff660c62307d505e34212a"],["/assets/js/bundle.js","1fef10796953f7999a99ccbb8434dd90"],["/contact/index.html","db319ac5bb60101e5c0c1cb04e2a0b15"],["/index.html","46b3a8b5a2a9dcd0619bb458a00e6e8f"],["/portfolio/2017-01-01-Bloc-Jams-AngularJS/index.html","3d918d1283dd5abeba14a4b52892b98a"],["/portfolio/2017-02-01-blocipedia/index.html","281e856248812e65b8ff2ba42481c8df"],["/portfolio/2017-03-01-bloc-chat-react/index.html","6711798d60a4f937c221fb36e67c7b9f"],["/portfolio/2017-04-01-bloccit/index.html","5fc5a8aec4f9add8188da4a83a403c28"],["/portfolio/2017-05-01-bloctime/index.html","15aa206e374c87d530c3a2075f400f62"],["/portfolio/2017-05-10-alexa-bro-science-trivia/index.html","747b97b1e192fe2a8c9cfcfc6251c819"],["/portfolio/2017-05-20-alexa-arizona-facts/index.html","97d6917f43e048d4de09bc3fb8ec7a78"],["/portfolio/2017-06-01-pong/index.html","993bde3ca75450658ec969e911c2f4d9"],["/portfolio/2017-07-01-bloc-jams-react/index.html","d204409cb88e8b37d221f3e0dce115d4"],["/portfolio/2017-08-01-Bloc-Chat-AngularJS/index.html","b6672368d15c8488372c9905c060d588"],["/portfolio/2017-09-01-bloc-jams-jquery/index.html","b7c13deb7dc699f3372b0415aebd1213"],["/sw.js","c6026c0b304e1b4f51d86ee892ff4f3b"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







