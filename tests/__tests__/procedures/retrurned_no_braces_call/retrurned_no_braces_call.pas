var
    i: integer;

function f(): procedure();
    procedure t();
    begin
        i := 144;
    end;
begin
    f := t;
end;

begin
    f;
    writeln(i);
end.