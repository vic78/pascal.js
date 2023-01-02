var a, b, e: boolean;
begin
    a := true;
    b := false;

    e := not not a and not not not not not not not b;
    writeln(e);
end.