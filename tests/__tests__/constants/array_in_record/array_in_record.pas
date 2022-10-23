type testType = record
    ar: array [1..2] of integer;
    st: real;
end;
var a : array [1..2] of testType = ((ar: (4, 11); st: 12.8), (ar: (45, 2); st: 6.0));
    r, s : real;
    n, m: integer;
begin
    r := a[1].st;
    s := a[2].st;
    n := a[1].ar[1];
    m := a[2].ar[2];
end.