(module
  (memory (export "memory") 1)

  ;; Reads boids from memory offset 0 as [x, y, vx, vy] f32 tuples.
  ;; Writes per-boid neighbor aggregates at outPtr as
  ;; [sx, sy, ax, ay, cx, cy, count] f32 tuples.
  (func (export "aggregate")
    (param $count i32)
    (param $sampleStep i32)
    (param $perceptionSq f32)
    (param $outPtr i32)
    (local $i i32)
    (local $j i32)
    (local $ix i32)
    (local $jx i32)
    (local $out i32)
    (local $x f32)
    (local $y f32)
    (local $dx f32)
    (local $dy f32)
    (local $d2 f32)
    (local $sx f32)
    (local $sy f32)
    (local $ax f32)
    (local $ay f32)
    (local $cx f32)
    (local $cy f32)
    (local $cnt f32)

    (local.set $i (i32.const 0))

    (block $outer_exit
      (loop $outer
        (br_if $outer_exit (i32.ge_s (local.get $i) (local.get $count)))

        (local.set $ix (i32.shl (local.get $i) (i32.const 4)))
        (local.set $x (f32.load (local.get $ix)))
        (local.set $y (f32.load (i32.add (local.get $ix) (i32.const 4))))
        (local.set $sx (f32.const 0))
        (local.set $sy (f32.const 0))
        (local.set $ax (f32.const 0))
        (local.set $ay (f32.const 0))
        (local.set $cx (f32.const 0))
        (local.set $cy (f32.const 0))
        (local.set $cnt (f32.const 0))
        (local.set $j (i32.const 0))

        (block $inner_exit
          (loop $inner
            (br_if $inner_exit (i32.ge_s (local.get $j) (local.get $count)))

            (if (i32.ne (local.get $j) (local.get $i))
              (then
                (local.set $jx (i32.shl (local.get $j) (i32.const 4)))
                (local.set
                  $dx
                  (f32.sub (f32.load (local.get $jx)) (local.get $x))
                )
                (local.set
                  $dy
                  (f32.sub
                    (f32.load (i32.add (local.get $jx) (i32.const 4)))
                    (local.get $y)
                  )
                )
                (local.set
                  $d2
                  (f32.add
                    (f32.mul (local.get $dx) (local.get $dx))
                    (f32.mul (local.get $dy) (local.get $dy))
                  )
                )

                (if (f32.lt (local.get $d2) (local.get $perceptionSq))
                  (then
                    (local.set $cnt (f32.add (local.get $cnt) (f32.const 1)))
                    (local.set
                      $ax
                      (f32.add
                        (local.get $ax)
                        (f32.load (i32.add (local.get $jx) (i32.const 8)))
                      )
                    )
                    (local.set
                      $ay
                      (f32.add
                        (local.get $ay)
                        (f32.load (i32.add (local.get $jx) (i32.const 12)))
                      )
                    )
                    (local.set
                      $cx
                      (f32.add (local.get $cx) (f32.load (local.get $jx)))
                    )
                    (local.set
                      $cy
                      (f32.add
                        (local.get $cy)
                        (f32.load (i32.add (local.get $jx) (i32.const 4)))
                      )
                    )

                    (if (f32.lt (local.get $d2) (f32.const 400))
                      (then
                        (local.set
                          $sx
                          (f32.sub (local.get $sx) (local.get $dx))
                        )
                        (local.set
                          $sy
                          (f32.sub (local.get $sy) (local.get $dy))
                        )
                      )
                    )
                  )
                )
              )
            )

            (local.set
              $j
              (i32.add (local.get $j) (local.get $sampleStep))
            )
            (br $inner)
          )
        )

        (local.set
          $out
          (i32.add
            (local.get $outPtr)
            (i32.mul (local.get $i) (i32.const 28))
          )
        )
        (f32.store (local.get $out) (local.get $sx))
        (f32.store (i32.add (local.get $out) (i32.const 4)) (local.get $sy))
        (f32.store (i32.add (local.get $out) (i32.const 8)) (local.get $ax))
        (f32.store (i32.add (local.get $out) (i32.const 12)) (local.get $ay))
        (f32.store (i32.add (local.get $out) (i32.const 16)) (local.get $cx))
        (f32.store (i32.add (local.get $out) (i32.const 20)) (local.get $cy))
        (f32.store (i32.add (local.get $out) (i32.const 24)) (local.get $cnt))

        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $outer)
      )
    )
  )
)
