import listProviderMonthAvailabilityService from '@modules/appointments/services/listProviderMonthAvailability-service';
import fakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fake-appointmentsRespository';

let listProviderMonthAvailability: listProviderMonthAvailabilityService;
let FakeAppointmentsRepository = new fakeAppointmentsRepository();

describe('ListProviderMonth', () => {
    it('should be able to list the month availability from provider', async () => {
        listProviderMonthAvailability =
            new listProviderMonthAvailabilityService(
                FakeAppointmentsRepository,
            );

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 8, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 9, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 10, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 11, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 12, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 13, 0, 0),
        });

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

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 16, 0, 0),
        });

        await FakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 16, 17, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            month: 5,
            year: 2020,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 16, available: false },
                { day: 24, available: true },
            ]),
        );
    });
});
