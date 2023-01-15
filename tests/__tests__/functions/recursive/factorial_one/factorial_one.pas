var i: integer;

function fakt(n: integer):integer;
begin
  if (n = 1) then
    result := 1
  else
    result := n * fakt(n-1);
end;
 
begin
  i := fakt(7);
end.