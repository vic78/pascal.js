var
    f: function (): integer;
    i: integer;

function t(): integer;
begin
    t := 144;
end;

function t(): real;
begin
    t := 144.0;
end;

begin
    f := t;
    i := f + 1;
end.