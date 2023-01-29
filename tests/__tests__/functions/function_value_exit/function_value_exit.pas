var a: integer;

function  getFunction(): integer;
begin
    getFunction := 5;
    exit(13);
    getFunction := 8;
end;

begin
   a := getFunction();
   writeln(a);
end.