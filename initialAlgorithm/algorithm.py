import time
import datetime

oneSecTDelta = datetime.timedelta(seconds=1)

class BreakConfig:
    def __init__(self, breakFrequency : datetime.timedelta, breakDuration : datetime.timedelta):
        self.__breakFreq = breakFrequency
        self.__breakDuration = breakDuration
        
    @property
    def breakFrequency(self):
        return self.__breakFreq
    
    @property
    def breakDuration(self):
        return self.__breakDuration

class ScheduleConfig:
    def __init__(self, breakConfig, wakeTime : time.time, sleepTime : time.time, breakInBetweenTasks : datetime.timedelta,\
        minimumWorkTime : datetime.timedelta):
        self.__breakConfig = breakConfig
        self.__wakeTime = wakeTime
        self.__sleepTime = sleepTime
        self.__breakInBetweenTasks = breakInBetweenTasks
        self.__minWorkTime = minimumWorkTime
    
    @property
    def wakeTime(self):
        return self.__wakeTime

    @property
    def sleepTime(self):
        return self.__sleepTime
    
    @property
    def breakInBetweenTasks(self):
        return self.__breakInBetweenTasks
    
    @property
    def breakConfig(self):
        return self.__breakConfig

    @property
    def minimumWorkTime(self):
        return self.__minWorkTime


#Concrete time allocations are all time allocs that have been assigned
#a real time in the current day

#Expectation is that all break time is inputted through the constructor of this object. Makes the schedule
#object cleaner by not having to worry about breaks
class ConcreteTimeAlloc:
    def __init__(self, startDateTime : datetime.datetime, endDateTime : datetime.datetime, title : str, breakTime : datetime.timedelta):
        self.__startDateTime = startDateTime
        self.__endDateTime = endDateTime
        self.__title = title
        self.__breakTime = breakTime
    
    @property
    def startDateTime(self):
        return self.__startDateTime
    
    @property
    def endDateTime(self):
        return self.__endDateTime

    @property
    def breakTime(self):
        return self.__breakTime
    
    @property
    def title(self):
        return self.__title

    def isOverlapping(self, otherConcreteAlloc) -> bool:
        if(otherConcreteAlloc.startDateTime < self.__startDateTime):
            return otherConcreteAlloc.endDateTime >= self.__startDateTime
        elif(otherConcreteAlloc.startDateTime > self.__startDateTime):
            return self.__endDateTime >= otherConcreteAlloc.startDateTime
        else:
            return True
    
    def getDuration(self) -> datetime.timedelta:
        return self.__endDateTime - self.__startDateTime

#Tasks need to be broken according to their timing rules, and then converted into concrete allocs
class Task:
    def __init__(self, title : str, priority : int, predictedTimeRemaining : datetime.timedelta, dueDate : datetime.datetime, \
        maxWorkTimePerStretch : datetime.timedelta, maxWorkTimePerDay : datetime.timedelta, minWorkTime : datetime.timedelta, \
            scheduleConfig : ScheduleConfig, passingTime : datetime.timedelta, shortBreakTime : datetime.timedelta):

        self.__dueDate = dueDate
        self.__title = title
        self.__priority = priority
        self.__predictedTimeRemaining = predictedTimeRemaining
        self.__maxWorkTimePerStretch = maxWorkTimePerStretch
        self.__maxWorkTimePerDay = maxWorkTimePerDay
        self.__passingTime = passingTime
        self.__shortBreakTime = shortBreakTime
        
        self.__minWorkTime = None

        if(minWorkTime >= scheduleConfig.minimumWorkTime):
            self.__minWorkTime = minWorkTime
        else:
            self.__minWorkTime = scheduleConfig.minimumWorkTime
    
    @property
    def minWorkTime(self):
        return self.__minWorkTime

    @property
    def maxWorkTimePerStretch(self):
        return self.__maxWorkTimePerStretch

    @property
    def maxWorkTimePerDay(self):
        return self.__maxWorkTimePerDay

    @property
    def passingTime(self):
        return self.__passingTime
    
    @property
    def shortBreakTime(self):
        return self.__shortBreakTime
    
    @property
    def title(self):
        return self.__title

#A slot of time that is free of any fixed allocations
class FreeSlot:
    def __init__(self, startDateTime : datetime.datetime, endDateTime : datetime.datetime, breakConfig : BreakConfig \
        , scheduleConfig : ScheduleConfig):
        self.__startDateTime = startDateTime
        self.__endDateTime = endDateTime
        self.__breakConfig = breakConfig
        self.__scheduleConfig = scheduleConfig
        
        #Tasks need to be converted into concrete allocs before being scheduled
        self.__taskList = []

        #Running total of current work time, if it exceeds the break config, this
        #free slot needs to be split into 2
        self.__workTimeTotalMins = datetime.timedelta()

    @property
    def taskList(self):
        return self.__taskList
    
    @property
    def startDateTime(self):
        return self.__startDateTime
    
    @property
    def endDateTime(self):
        return self.__endDateTime

    def getDuration(self) -> datetime.timedelta:
        if(len(self.__taskList) > 0):
            return self.__endDateTime - (self.__taskList[-1].endDateTime + oneSecTDelta)
        else:
            return self.__endDateTime - self.__startDateTime

    def canTaskBeScheduledIntoThisSlot(self, task : Task) -> bool:
        minimumWorkTime = task.minWorkTime
        
        #If there isn't enough time, don't go forward
        if(minimumWorkTime > self.getDuration()):
            return False

        tdObjNeededForTask = minimumWorkTime

        if len(self.__taskList) > 0:
            #Checking if the previous break is long enough to satisy our passing time requirements
            prevBreakTime = self.__taskList[-1].getDuration()

            if(prevBreakTime < task.passingTime):
                tdObjNeededForTask += task.passingTime - prevBreakTime
        
        #Add on the appropriate kind of break for this
        if (self.__workTimeTotalMins + minimumWorkTime) > self.__breakConfig.breakFrequency:
            tdObjNeededForTask += self.__breakConfig.breakDuration
        else:
            tdObjNeededForTask += task.shortBreakTime
        
        return self.getDuration() >= tdObjNeededForTask
    
    #Returns how much time will be spent on this task, used by the external algorithm
    #to determine if it needs to schedule this task again in another time block
    def scheduleTaskIntoThisSlot(self, task : Task) -> datetime.timedelta:
        if not self.canTaskBeScheduledIntoThisSlot(task):
            raise ValueError
        else:
            if len(self.__taskList) > 0:
                #Checking if the previous break is long enough to satisy our passing time requirements
                prevBreakTime = self.__taskList[-1].getDuration()

                #If not, replacing the old break with a longer one
                if(prevBreakTime < task.passingTime):
                    extensionTime = task.passingTime - prevBreakTime
                    
                    newStartDateTime = self.__taskList[-1].startDateTime
                    newEndDateTime = self.__taskList[-1].endDateTime + extensionTime
                    title = self.__taskList[-1].title
                    
                    newBreakAlloc = ConcreteTimeAlloc(newStartDateTime, newEndDateTime, title, datetime.timedelta())
                
                    self.__taskList[-1] = newBreakAlloc
            
            workTimeDelta = task.minWorkTime

            #Increment by 1 minute every time, check if schedule is still possible
            while True:
                newWorkTimeDelta = workTimeDelta + datetime.timedelta(minutes=1)
                totalTimeToAdd = newWorkTimeDelta
                if(self.__workTimeTotalMins + newWorkTimeDelta < self.__breakConfig.breakFrequency):
                    totalTimeToAdd += task.shortBreakTime
                else:
                    totalTimeToAdd += self.__breakConfig.breakDuration
                
                if totalTimeToAdd <= self.getDuration():
                    workTimeDelta = newWorkTimeDelta
                else:
                    break
            
            newStartDatetime = None
            if len(self.__taskList) == 0:
                newStartDatetime = self.__startDateTime + oneSecTDelta
            else:
                newStartDatetime = self.__taskList[-1].endDateTime + oneSecTDelta

            newEndDatetime = newStartDatetime + workTimeDelta

            #Updating the work time running total
            self.__workTimeTotalMins += workTimeDelta

            #Now we know the maximum time we can spend on this task, now to actually schedule it
            #This has a zero length since the break will be added after
            newTimeAlloc = ConcreteTimeAlloc(newStartDatetime, newEndDatetime, task.title, datetime.timedelta())
            
            breakStartDateTime = newTimeAlloc.endDateTime + oneSecTDelta
            if(self.__workTimeTotalMins + workTimeDelta < self.__breakConfig.breakFrequency):
                breakEndDateTime = breakStartDateTime + task.shortBreakTime
                
            else:
                breakEndDateTime = breakStartDateTime + self.__breakConfig.breakDuration
            
            breakAlloc = ConcreteTimeAlloc(breakStartDateTime, breakEndDateTime, "Break", datetime.timedelta())
            
            self.__taskList.append(newTimeAlloc)
            self.__taskList.append(breakAlloc)
    
    #Returns true if this time slot needs to be split
    def needSplit(self):
        return self.__workTimeTotalMins >= self.__breakConfig.breakDuration

    #Splits the current time slot into 2 different ones, with the first being fully populated
    #and the second being empty(the order of them in the array is [first, second])
    def splitIntoTwoSlots(self):
        endTimeForCurrentSlot = self.__taskList[-1].endDateTime

        startTimeForNewSlot = endTimeForCurrentSlot + oneSecTDelta
        endTimeForNewSlot = self.__endDateTime

        self.__endDateTime = self.__taskList[-1].endDateTime

        newSlot = FreeSlot(startTimeForNewSlot, endTimeForNewSlot, self.__breakConfig, self.__scheduleConfig)

        return [self, newSlot]

#Class representing the schedule for the day
class Schedule:
    def __init__(self, scheduleConfig : ScheduleConfig, breakConfig : BreakConfig):
        self.__concreteAllocs = []
        self.__scheduleConfig = scheduleConfig
        self.__breakConfig = breakConfig

    @property
    def getAllConcreteAllocs(self):
        return self.__concreteAllocs
        
    def addConcreteAlloc(self, concreteAlloc : ConcreteTimeAlloc):
        print(concreteAlloc.title)
        print(concreteAlloc.startDateTime)
        print(concreteAlloc.endDateTime)

        self.__concreteAllocs.append(concreteAlloc)

        if(concreteAlloc.breakTime != datetime.timedelta()):
            #Adding in the break, as prescribed by the concrete alloc
            breakStartDateTime = concreteAlloc.endDateTime + oneSecTDelta
            breakEndDateTime = breakStartDateTime + concreteAlloc.breakTime

            breakConcreteAlloc = ConcreteTimeAlloc(breakStartDateTime, breakEndDateTime, "Break", datetime.timedelta())

            self.__concreteAllocs.append(breakConcreteAlloc)

        self.__concreteAllocs.sort(key=lambda alloc : alloc.startDateTime)

        for i in range(len(self.__concreteAllocs) - 1):
            try:
                if(self.__concreteAllocs[i].isOverlapping(self.__concreteAllocs[i + 1])):
                    raise ValueError
            except:
                print(self.__concreteAllocs[i].title)
                print(self.__concreteAllocs[i].startDateTime)
                print(self.__concreteAllocs[i].endDateTime)
                
                print(self.__concreteAllocs[i + 1].title)
                print(self.__concreteAllocs[i + 1].startDateTime)
                print(self.__concreteAllocs[i + 1].endDateTime)

    def getAllFreeSlots(self):
        listOfFreeTimes = []
        wakeDateTimeObj = datetime.datetime.combine(datetime.date.today(), self.__scheduleConfig.wakeTime)
        sleepDateTimeObj = datetime.datetime.combine(datetime.date.today(), self.__scheduleConfig.sleepTime)
        if (self.__concreteAllocs[0].startDateTime - wakeDateTimeObj) > self.__scheduleConfig.minimumWorkTime:

            listOfFreeTimes.append(FreeSlot(wakeDateTimeObj, self.__concreteAllocs[0].startDateTime - oneSecTDelta\
                , self.__breakConfig, self.__scheduleConfig))
        
        for x in range(len(self.__concreteAllocs) - 1):
            if (self.__concreteAllocs[x+1].startDateTime - self.__concreteAllocs[x].endDateTime) > self.__scheduleConfig.minimumWorkTime:

                listOfFreeTimes.append(FreeSlot(self.__concreteAllocs[x].endDateTime + oneSecTDelta,\
                     self.__concreteAllocs[x+1].startDateTime - oneSecTDelta\
                , self.__breakConfig, self.__scheduleConfig))
        
        if (sleepDateTimeObj - self.__concreteAllocs[-1].endDateTime) > self.__scheduleConfig.minimumWorkTime:
            listOfFreeTimes.append(FreeSlot(self.__concreteAllocs[-1].endDateTime, sleepDateTimeObj, \
                self.__breakConfig, self.__scheduleConfig))

        return listOfFreeTimes

    def addFreeSlotToSchedule(self, freeSlot):
        for alloc in freeSlot.taskList:
            self.addConcreteAlloc(alloc)

    def print(self):
        self.__concreteAllocs.sort(key=lambda alloc : alloc.startDateTime)
        for alloc in self.__concreteAllocs:
            print(alloc.title)
            print(alloc.startDateTime)
            print(alloc.endDateTime)