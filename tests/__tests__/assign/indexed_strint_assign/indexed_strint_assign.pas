var s: string;
    c: char;
begin
    s := 'abcdefghij';
    s[4] := 'p';
    c := s[4];

    writeln(c);
end.