export function linearSearch(arr, target)
{
    let result = [];
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i]===target)
        {
            result.push(true)
            break;
        }
        result.push(false);
    }
    return result;
}