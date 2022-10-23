type complex = record
    im: real;
    re: real;
end;
var a : array [1..2] of complex = ((im: 1; re: 12.8), (im: 45.2; re: 6.0));

var r, s : real;
begin
    r := a[1].re;
    s := a[2].im;
end.