var i: integer;

function fib(n: integer): integer;
begin
  if(n < 2) then
    result:= n
  else
    result:= fib(n-1) + fib(n-2);
end;
 
begin
  i := fib(7);
end.