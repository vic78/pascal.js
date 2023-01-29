var a: integer;

function  getFunction(): integer;
begin
    getFunction := 13;
    exit;
    getFunction := 5;
end;

begin
   a := getFunction();
   writeln(a);
end.