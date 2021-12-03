import listProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability';
import fakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fake-appointmentsRespository';

let ListProviderDayAvailability: listProviderDayAvailability;
let FakeAppointmentsRepository = new fakeAppointmentsRepository();

describe('ListProviderMonth', () => {
    it('should be able to list the month availability from provider', async () => {
        ListProviderDayAvailability = new listProviderDayAvailability(
            FakeAppointmentsRepository,
        );

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 14, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 16, 15, 0, 0).getTime();
        });

        const availability = await ListProviderDayAvailability.execute({
            provider_id: 'user',
            day: 16,
            month: 5,
            year: 2020,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 13, available: true },
                { hour: 16, available: true },
            ]),
        );
    });
});
