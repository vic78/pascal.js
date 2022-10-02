type newArr = array [1..4] of integer;

var a:newArr;
    i:integer;

function setArr(arr:newArr): newArr;
begin
    arr[1]:=144;
    result := arr;
end;

begin
    a := setArr(a);
    i := a[1];
    writeln(i);
end.