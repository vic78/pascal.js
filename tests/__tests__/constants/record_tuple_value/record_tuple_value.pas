const rc : record
    im: real;
    re: real;
end = (im: 2.3 ; re: 4.6);
var
    r, s : real;
begin
    r := rc.re;
    s := rc.im;
end.