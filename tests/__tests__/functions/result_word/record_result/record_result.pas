type complex = record
    re, im: real
end;

var r, i: real;
    c: complex;

function setComplex(cc: complex): complex;
begin
    cc.re:=144.23;
    cc.im:=22.244;
    result := cc;
end;

begin
    c := setComplex(c);
    r := c.re;
    i := c.im;

    writeln('im ', r);
    writeln('re ', i);
end.