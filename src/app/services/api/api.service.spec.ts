import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule } from '@nebular/theme';
import { IApi } from 'src/app/interfaces/api';
import { Match } from 'src/app/interfaces/match';
import { Soccer } from 'src/app/interfaces/soccer';
import { ThemeModule } from 'src/app/theme/theme.module';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  // let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
      ]
    });
    service = TestBed.inject(ApiService);
    // httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAllSoccers',() => {
    let expectedSoccers: IApi<Soccer[]>
    
    beforeEach(() => {
      expectedSoccers = {
        data:[
          {
            _id: "1",
            name: "Jan",
            surname: " Kowalski"
          },
          {
            _id: "2",
            name: "Paweł",
            surname: "Janowski"
          }
        ],
        message: "Soccers retrieved successfully",
        status: "success"
      } as IApi<Soccer[]>;
    });

    //Test case 1
    it('should get soccers', () => {
      service.getSoccers().subscribe(
        soccers => {
          expect(soccers).toEqual(expectedSoccers, 'should return contain soccers')
        },
        fail
      )
      
      const req = httpMock.expectOne(service.api+'soccers');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedSoccers); 
    })

    //Test case 2
    it('should be OK returning no soccer', () => {
      service.getSoccers().subscribe(
        soccers => {
          expect(soccers.data.length).toEqual(0, 'should have empty soccer array')
        },
        fail
      );

      const req = httpMock.expectOne(service.api+'soccers');
      req.flush({
        message:"Soccers []",
        status:"empty arr",
        data:[] //Return empty data
      }); 
    });

    //Test case 3
    it('should turn 404 error into an empty soccer result', () => {
      service.getSoccers().subscribe(
        soccers => {
          expect(Object.keys(soccers).length).toBe(0,'should return empty soccer array')
        },
        fail
      );

      const req = httpMock.expectOne(service.api+'soccers');

      const msg = {
        message: "404 error",
        status: "not found",
        data: []
      };
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

    //Test case 4
    it('should return expected soccers when called multiple times', () => {
      service.getSoccers().subscribe();
      service.getSoccers().subscribe(
        soccers => {
          expect(soccers).toEqual(expectedSoccers, 'should return expected soccers')
        },
        fail
      );

      const req = httpMock.match(service.api+'soccers');
      expect(req.length).toEqual(2, 'calls to getSoccers()');

      req[0].flush([]); //Return Empty body for first call
      req[1].flush(expectedSoccers); //Return expectedEmps in second call
    });

  })

  describe('#getAgentSoccers',() => {
    let expectedSoccers: IApi<Soccer[]>
    
    beforeEach(() => {
      expectedSoccers = {
        data:[
          {
            _id: "1",
            name: "Jan",
            surname: "Kowalski",
            agentId: "4"
          },
          {
            _id: "2",
            name: "Paweł",
            surname: "Janowski",
            agentId: "4"
          }
        ],
        message: "Soccers retrieved successfully",
        status: "success"
      } as IApi<Soccer[]>;
    });

    //Test case 1
    it('should get agent soccers', async () => {
      (await service.getAgentSoccers())
        .subscribe(
          soccers => {
            expect(soccers).toEqual(expectedSoccers, 'should return agent soccers')
          },
          fail
        )
      const req = httpMock.expectOne(
        {
          method:"POST",
          url:service.api+'soccers/agent'
        }
      );
      expect(req.request.method).toEqual('POST');

      req.flush(expectedSoccers); 
    })

    //Test case 2
    it('should be OK returning no agent soccer', async () => {
      (await service.getAgentSoccers())
        .subscribe(
          soccers => {
            expect(soccers.data.length).toEqual(0, 'should have empty agent soccer array')
          },
          fail
        );

        const req = httpMock.expectOne(
          {
            method:"POST",
            url:service.api+'soccers/agent'
          }
        );
      req.flush({
        message:"Soccers []",
        status:"empty arr",
        data:[] //Return empty data
      }); 
    });

    //Test case 3
    it('should turn 404 error into an empty agent soccer result', async () => {
      (await service.getAgentSoccers())
      .subscribe(
        soccers => {
          expect(Object.keys(soccers).length).toBe(0,'should return empty agent soccer array')
        },
        fail
      );

      const req = httpMock.expectOne(
        {
          method:"POST",
          url:service.api+'soccers/agent'
        }
      );

      const msg = {
        message: "404 error",
        status: "not found",
        data: []
      };
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

    //Test case 4
    it('should return expected agent when called multiple times', async () => {
      (await service.getAgentSoccers()).subscribe();
      (await service.getAgentSoccers()).subscribe(
        soccers => {
          expect(soccers).toEqual(expectedSoccers, 'should return expected agent soccers')
        },
        fail
      );

      const req = httpMock.match(
        {
          method:"POST",
          url:service.api+'soccers/agent'
        }
      );
      expect(req.length).toEqual(2, 'calls to getSoccers()');

      req[0].flush([]); //Return Empty body for first call
      req[1].flush(expectedSoccers); //Return expectedEmps in second call
    });

  })

  describe('#getMatches',() => {
    let expectedMatches: IApi<Match[]>
    
    beforeEach(() => {
      expectedMatches = {
        data:[
          {
            _id: "1",
            stadium: "Pepsi Arena",
            match_date: new Date()
          },
          {
            _id: "2",
            stadium: "Pepsi Arena",
            match_date: new Date()
          }
        ],
        message: "Matches retrieved successfully",
        status: "success"
      } as IApi<Match[]>;
    });

    //Test case 1
    it('should get matches', () => {
      service.getMatches().subscribe(
        matches => {
          expect(matches).toEqual(expectedMatches, 'should return contain matches')
        },
        fail
      )
      
      const req = httpMock.expectOne(service.api+'soccers/match');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedMatches); 
    })

    //Test case 2
    it('should be OK returning no matches', () => {
      service.getMatches().subscribe(
        matches => {
          expect(matches.data.length).toEqual(0, 'should have empty matches array')
        },
        fail
      );

      const req = httpMock.expectOne(service.api+'soccers/match');
      req.flush({
        message:"Soccers []",
        status:"empty arr",
        data:[] //Return empty data
      }); 
    });

    //Test case 3
    it('should turn 404 error into an empty matches result', () => {
      service.getMatches().subscribe(
        matches => {
          expect(Object.keys(matches).length).toBe(0,'should return empty matches array')
        },
        fail
      );

      const req = httpMock.expectOne(service.api+'soccers/match');

      const msg = {
        message: "404 error",
        status: "not found",
        data: []
      };
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

    //Test case 4
    it('should return expected matches when called multiple times', () => {
      service.getMatches().subscribe();
      service.getMatches().subscribe(
        matches => {
          expect(matches).toEqual(expectedMatches, 'should return expected matches')
        },
        fail
      );

      const req = httpMock.match(service.api+'soccers/match');
      expect(req.length).toEqual(2, 'calls to getMatches()');

      req[0].flush([]); //Return Empty body for first call
      req[1].flush(expectedMatches); //Return expectedEmps in second call
    });

  })
});
