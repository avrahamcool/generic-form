export class JsonValueConverter
{
	toView(obj: any): string
	{
		return obj && JSON.stringify(obj);
	}
}
