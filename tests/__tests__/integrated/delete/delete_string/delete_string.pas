var s: string;
count: integer = 3;
index: integer = 2;
begin
    s := 'abcd efgh';
    delete(s, index, count);
    writeln(s);
end.