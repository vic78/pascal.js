const a: array [1..3] of array[1..2] of integer = ((1, 12), (45, 6), (7, 18));
var
    i, j: integer;
begin
    i := a[2][1];
    j := a[3][2];
end.