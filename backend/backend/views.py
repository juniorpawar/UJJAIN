from django.http import JsonResponse

def test(request):
    data={
        'message':'Okay',
        'success': True
    }
    return JsonResponse(data)

