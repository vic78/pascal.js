var i: integer;

procedure fib (a, b, n: integer);
begin
  if not (n = 0) then
  begin
    write(a, '  ');
    i := a;
    fib (b, a+b, n-1);
  end;
end;

begin
  fib(1, 1, 8);
end.