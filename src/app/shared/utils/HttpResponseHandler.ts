import { HttpStatusCode } from "@angular/common/http";

export function HttpResponseHandler(response: any){
  switch(response.status){
    case(HttpStatusCode.Ok): break;
    case(HttpStatusCode.Created): break;
    case(HttpStatusCode.Accepted): break;
    case(HttpStatusCode.BadRequest): break;
    case(HttpStatusCode.Unauthorized): break;
    case(HttpStatusCode.NotFound): break;
    case(HttpStatusCode.MethodNotAllowed): break;
    case(HttpStatusCode.PayloadTooLarge): break;
    case(HttpStatusCode.InternalServerError): break;
    case(HttpStatusCode.NotImplemented): break;
    case(HttpStatusCode.BadGateway): break;
    case(HttpStatusCode.ServiceUnavailable): break;
  }
}
