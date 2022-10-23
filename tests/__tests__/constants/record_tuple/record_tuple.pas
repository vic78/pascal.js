var rc : record
    im: real;
    re: real;
end = (im: 2.3 ; re: 4.6);
r, s : real;
begin
    r := rc.re;
    s := rc.im;
end.