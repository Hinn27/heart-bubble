"use strict";

!(function () {
    // Helper function to get canvas size based on viewport
    function getCanvasSize() {
        const vmin = Math.min(window.innerWidth, window.innerHeight);
        const desiredSize = Math.min(vmin * 0.9, 512);
        return Math.floor(desiredSize);
    }

    function t() {
        !(function () {
            var t, g;

            // Get initial canvas size
            const canvasSize = getCanvasSize();
            l = canvasSize;
            s = canvasSize;

            if (
                ((o = l / 2),
                (a = s / 2),
                (n = c.create()),
                (e = n.world),
                (r = d.create({
                    element: document.body,
                    engine: n,
                    options: {
                        width: l,
                        height: s,
                        wireframes: !1,
                        background: "transparent",
                        pixelRatio: window.devicePixelRatio || 1,
                    },
                })),
                (i = u.create()),
                u.run(i, n),
                (n.gravity.scale = 0),
                (n.gravity.x = 0),
                (n.gravity.y = 0),
                "undefined" != typeof fetch)
            ) {
                ((t = function (t, e) {
                    return Array.prototype.slice.call(t.querySelectorAll(e));
                }),
                    (g = function (t) {
                        return fetch(t)
                            .then(function (t) {
                                return t.text();
                            })
                            .then(function (t) {
                                return new window.DOMParser().parseFromString(
                                    t,
                                    "image/svg+xml",
                                );
                            });
                    })(svg_terrain).then(function (n) {
                        var r = t(n, "path"),
                            i = r.map(function (t) {
                                return v.pathToVertices(t, 30);
                            }),
                            terrainScale = l / 512,
                            terrainBody = y.fromVertices(
                                l / 2,
                                200 * terrainScale,
                                i,
                                {
                                    isStatic: !0,
                                    render: {
                                        fillStyle: "transparent",
                                        strokeStyle: "transparent",
                                        lineWidth: 1,
                                    },
                                },
                                !0,
                            );
                        M.scale(terrainBody, terrainScale, terrainScale);
                        h.add(e, terrainBody);
                        o = terrainBody.position.x;
                        a = terrainBody.position.y;
                    }));

                let n = null,
                    r = null;
                g(svg_heart).then(function (e) {
                    if (!n) {
                        r = t(e, "path").map(function (t) {
                            return v.pathToVertices(t, 50);
                        });
                        n = y.fromVertices(
                            o,
                            1.5 * a,
                            r,
                            {
                                restitution: 0,
                                friction: 0,
                                frictionStatic: 0,
                                frictionAir: 0,
                                mass: 20,
                                render: {
                                    lineWidth: 2,
                                },
                            },
                            !0,
                        );
                        M.scale(n, 0.2, 0.2);
                    }
                });

                let createHeart = function () {
                    if (!n) return;
                    let t = structuredClone(n);
                    t.id = f.nextId();
                    t.position.x = o;
                    t.position.y = 1.5 * a;
                    S.push(S.shift());
                    let r = S[0];
                    t.render.fillStyle = r;
                    t.render.strokeStyle = r;
                    t.parts.forEach(function (e, n) {
                        t.parts[n].render.fillStyle = r;
                        t.parts[n].render.strokeStyle = r;
                    });
                    M.setAngle(t, Math.round(360 * Math.random()), !1);
                    M.setVelocity(t, {
                        x: f.random(-5, 5),
                        y: f.random(-5, -1),
                    });
                    h.add(e, t);
                };

                setTimeout(function () {
                    let t = 0,
                        interval = setInterval(() => {
                            createHeart();
                            if (t == 2) {
                                clearInterval(interval);
                                n = null;
                                r = null;
                            }
                            t++;
                        }, 780);
                }, 220);
            } else {
                f.warn("Fetch is not available. Could not load SVG.");
            }

            let k = m.create(r.canvas),
                x = p.create(n, {
                    mouse: k,
                    constraint: {
                        stiffness: 0.2,
                        render: {
                            visible: !1,
                        },
                    },
                });
            h.add(e, x);
            r.mouse = k;
            d.lookAt(r, {
                min: {
                    x: 0,
                    y: 0,
                },
                max: {
                    x: l,
                    y: s,
                },
            });
            d.run(r);
        })();
    }

    let e,
        n,
        r,
        i,
        o,
        a,
        l = 512,
        s = 512,
        c = (Matter.World, Matter.Engine),
        d = Matter.Render,
        u = Matter.Runner,
        f = (Matter.Composites, Matter.Common),
        p = Matter.MouseConstraint,
        m = Matter.Mouse,
        h = Matter.Composite,
        y = (Matter.Vertices, Matter.Bodies),
        M = Matter.Body,
        v = (Matter.Events, Matter.Query, Matter.Svg),
        g = [
            "pink",
            "deeppink",
            "deeppink",
            "hotpink",
            "hotpink",
            "lightpink",
            "magenta",
            "orchid",
        ],
        S = ["mediumvioletred", "crimson", "salmon"];

    window.onload = () => {
        t();
    };

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            const newSize = getCanvasSize();
            // Only recreate if size changed significantly
            if (Math.abs(newSize - l) > 50) {
                location.reload();
            }
        }, 300);
    });

    // Prevent pull-to-refresh on mobile
    document.body.addEventListener(
        "touchmove",
        function (e) {
            if (e.target.tagName !== "CANVAS") {
                e.preventDefault();
            }
        },
        { passive: false },
    );

    // Create bubbles
    setTimeout(function () {
        let t = 0,
            n = setInterval(() => {
                if (e) {
                    let color = f.choose(g);
                    const bubble = y.circle(o, a, 25, {
                        restitution: 0,
                        friction: 0,
                        frictionStatic: 0,
                        frictionAir: 0,
                        mass: 10,
                        render: {
                            fillStyle: color,
                            strokeStyle: color,
                            lineWidth: 0,
                        },
                    });
                    M.setVelocity(bubble, {
                        x: f.random(-1, 1),
                        y: f.random(-1, 1),
                    });
                    h.add(e, bubble);
                }
                if (t == 60) {
                    clearInterval(n);
                }
                t++;
            }, 100);
    }, 2000);
})();
